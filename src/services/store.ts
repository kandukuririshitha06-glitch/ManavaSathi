import type {
  AssistancePoint,
  CommunityNeedsReport,
  VolunteerTask,
  Organization,
  SupplyDonation,
  MonetaryDonation,
  AuditLog,
  UserProfile,
  UserRole,
  AppNotification,
  ListingStatus,
  NeedStatus
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_ORGANIZATIONS,
  INITIAL_ASSISTANCE_POINTS,
  INITIAL_COMMUNITY_NEEDS,
  INITIAL_VOLUNTEER_TASKS,
  INITIAL_SUPPLY_DONATIONS,
  INITIAL_MONETARY_DONATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_NOTIFICATIONS
} from '../data/mockData';

const STORAGE_KEY_PREFIX = 'manavasathi_';

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Failed to read ${key} from storage`, e);
    return fallback;
  }
}

function saveStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(data));
  } catch (e) {
    console.error(`Failed to save ${key} to storage`, e);
  }
}

// In-memory reactive state with listeners
class StoreService {
  private users: UserProfile[] = loadStorage('users', INITIAL_USERS);
  private currentUser: UserProfile = loadStorage('current_user', INITIAL_USERS[0]); // default admin for easy initial evaluation
  private assistancePoints: AssistancePoint[] = loadStorage('points', INITIAL_ASSISTANCE_POINTS);
  private communityNeeds: CommunityNeedsReport[] = loadStorage('needs', INITIAL_COMMUNITY_NEEDS);
  private volunteerTasks: VolunteerTask[] = loadStorage('tasks', INITIAL_VOLUNTEER_TASKS);
  private organizations: Organization[] = loadStorage('organizations', INITIAL_ORGANIZATIONS);
  private supplyDonations: SupplyDonation[] = loadStorage('supplies', INITIAL_SUPPLY_DONATIONS);
  private monetaryDonations: MonetaryDonation[] = loadStorage('monetary', INITIAL_MONETARY_DONATIONS);
  private auditLogs: AuditLog[] = loadStorage('audit_logs', INITIAL_AUDIT_LOGS);
  private notifications: AppNotification[] = loadStorage('notifications', INITIAL_NOTIFICATIONS);

  private listeners: Set<() => void> = new Set();

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  // --- User / Role Management ---
  public getCurrentUser(): UserProfile {
    return this.currentUser;
  }

  public setCurrentUserRole(role: UserRole): void {
    const foundUser = this.users.find((u) => u.role === role);
    if (foundUser) {
      this.currentUser = foundUser;
    } else {
      this.currentUser = {
        id: `user-${role}-test`,
        email: `${role}@manavasathi.org`,
        displayName: `${role.toUpperCase().replace('_', ' ')} (Demo User)`,
        role: role,
        state: 'Telangana',
        district: 'Hyderabad',
        city: 'Hyderabad',
        isVerified: true,
        createdAt: new Date().toISOString()
      };
    }
    saveStorage('current_user', this.currentUser);
    this.notify();
  }

  public updateUserProfile(updated: Partial<UserProfile>): void {
    this.currentUser = { ...this.currentUser, ...updated };
    this.users = this.users.map((u) => (u.id === this.currentUser.id ? this.currentUser : u));
    saveStorage('current_user', this.currentUser);
    saveStorage('users', this.users);
    this.notify();
  }

  // --- Assistance Points Management ---
  public getAssistancePoints(): AssistancePoint[] {
    return this.assistancePoints;
  }

  public getAssistancePointById(id: string): AssistancePoint | undefined {
    return this.assistancePoints.find((p) => p.id === id);
  }

  public addAssistancePoint(point: Omit<AssistancePoint, 'id' | 'createdAt' | 'updatedAt' | 'isDemoData' | 'status'>): AssistancePoint {
    const newPoint: AssistancePoint = {
      ...point,
      id: `point-${Date.now()}`,
      status: this.currentUser.role === 'admin' ? 'verified' : 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemoData: true // clearly labeled per requirements
    };

    this.assistancePoints = [newPoint, ...this.assistancePoints];
    saveStorage('points', this.assistancePoints);

    // Add notification for admins
    this.addNotification({
      userId: 'user-admin-1',
      title: 'New Assistance Point Awaiting Verification',
      message: `"${newPoint.title}" in ${newPoint.address.city}, ${newPoint.address.state} submitted for review.`,
      type: 'info',
      link: '/admin'
    });

    this.notify();
    return newPoint;
  }

  public updateAssistancePointStatus(id: string, status: ListingStatus, notes?: string): void {
    this.assistancePoints = this.assistancePoints.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          status,
          verificationNotes: notes || p.verificationNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    });
    saveStorage('points', this.assistancePoints);

    // Audit log
    this.addAuditLog({
      action: `UPDATED_POINT_STATUS_TO_${status.toUpperCase()}`,
      targetType: 'listing',
      targetId: id,
      reason: notes || `Admin updated status to ${status}`
    });

    this.notify();
  }

  public updatePointAvailability(id: string, availabilityStatus: AssistancePoint['availabilityStatus']): void {
    this.assistancePoints = this.assistancePoints.map((p) => {
      if (p.id === id) {
        return {
          ...p,
          availabilityStatus,
          lastConfirmedDate: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString()
        };
      }
      return p;
    });
    saveStorage('points', this.assistancePoints);
    this.notify();
  }

  // --- Community Needs Reports ---
  public getCommunityNeeds(): CommunityNeedsReport[] {
    return this.communityNeeds;
  }

  public addCommunityNeed(need: Omit<CommunityNeedsReport, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'isDemoData'>): CommunityNeedsReport {
    const newNeed: CommunityNeedsReport = {
      ...need,
      id: `need-${Date.now()}`,
      status: 'awaiting_review',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isDemoData: true
    };

    this.communityNeeds = [newNeed, ...this.communityNeeds];
    saveStorage('needs', this.communityNeeds);

    this.addNotification({
      userId: 'user-admin-1',
      title: 'Community Need Reported',
      message: `New need reported in ${newNeed.approximateLocation.city}, ${newNeed.approximateLocation.state} (${newNeed.urgency.toUpperCase()} urgency).`,
      type: 'warning',
      link: '/admin'
    });

    this.notify();
    return newNeed;
  }

  public updateCommunityNeedStatus(id: string, status: NeedStatus, notes?: string): void {
    this.communityNeeds = this.communityNeeds.map((n) => {
      if (n.id === id) {
        return {
          ...n,
          status,
          reviewedBy: this.currentUser.displayName,
          reviewNotes: notes || n.reviewNotes,
          updatedAt: new Date().toISOString()
        };
      }
      return n;
    });
    saveStorage('needs', this.communityNeeds);

    this.addAuditLog({
      action: `UPDATED_NEED_STATUS_TO_${status.toUpperCase()}`,
      targetType: 'need',
      targetId: id,
      reason: notes || `Admin changed need status to ${status}`
    });

    this.notify();
  }

  // --- Volunteer Tasks ---
  public getVolunteerTasks(): VolunteerTask[] {
    return this.volunteerTasks;
  }

  public addVolunteerTask(task: Omit<VolunteerTask, 'id' | 'createdAt' | 'isDemoData' | 'volunteersAssigned'>): VolunteerTask {
    const newTask: VolunteerTask = {
      ...task,
      id: `task-${Date.now()}`,
      volunteersAssigned: [],
      createdAt: new Date().toISOString(),
      isDemoData: true
    };
    this.volunteerTasks = [newTask, ...this.volunteerTasks];
    saveStorage('tasks', this.volunteerTasks);
    this.notify();
    return newTask;
  }

  public assignVolunteerToTask(taskId: string, userId: string): boolean {
    const task = this.volunteerTasks.find((t) => t.id === taskId);
    if (!task) return false;

    if (!task.volunteersAssigned.includes(userId)) {
      task.volunteersAssigned.push(userId);
      if (task.volunteersAssigned.length >= task.volunteersRequired) {
        task.status = 'assigned';
      }
      saveStorage('tasks', this.volunteerTasks);

      this.addNotification({
        userId,
        title: 'Task Assignment Confirmed',
        message: `You have successfully joined the volunteer activity: "${task.title}".`,
        type: 'success',
        link: '/volunteer-dashboard'
      });

      this.notify();
      return true;
    }
    return false;
  }

  public withdrawVolunteerFromTask(taskId: string, userId: string): void {
    const task = this.volunteerTasks.find((t) => t.id === taskId);
    if (task) {
      task.volunteersAssigned = task.volunteersAssigned.filter((id) => id !== userId);
      if (task.volunteersAssigned.length < task.volunteersRequired && task.status === 'assigned') {
        task.status = 'open';
      }
      saveStorage('tasks', this.volunteerTasks);
      this.notify();
    }
  }

  public completeVolunteerTask(taskId: string, notes?: string): void {
    this.volunteerTasks = this.volunteerTasks.map((t) => {
      if (t.id === taskId) {
        return {
          ...t,
          status: 'completed',
          completionNotes: notes
        };
      }
      return t;
    });
    saveStorage('tasks', this.volunteerTasks);
    this.notify();
  }

  // --- Organizations ---
  public getOrganizations(): Organization[] {
    return this.organizations;
  }

  public addOrganization(org: Omit<Organization, 'id' | 'createdAt' | 'isDemoData' | 'verificationStatus'>): Organization {
    const newOrg: Organization = {
      ...org,
      id: `org-${Date.now()}`,
      verificationStatus: 'pending',
      createdAt: new Date().toISOString(),
      isDemoData: true
    };
    this.organizations = [newOrg, ...this.organizations];
    saveStorage('organizations', this.organizations);

    this.addNotification({
      userId: 'user-admin-1',
      title: 'New Organization Registration',
      message: `"${newOrg.name}" registered for verification in ${newOrg.city}, ${newOrg.state}.`,
      type: 'info',
      link: '/admin'
    });

    this.notify();
    return newOrg;
  }

  public updateOrganizationVerification(id: string, status: 'verified' | 'rejected', notes?: string): void {
    this.organizations = this.organizations.map((org) => {
      if (org.id === id) {
        return {
          ...org,
          verificationStatus: status,
          verifiedAt: status === 'verified' ? new Date().toISOString() : undefined,
          verificationNotes: notes
        };
      }
      return org;
    });
    saveStorage('organizations', this.organizations);

    this.addAuditLog({
      action: `ORGANIZATION_${status.toUpperCase()}`,
      targetType: 'organization',
      targetId: id,
      reason: notes || `Admin updated verification status to ${status}`
    });

    this.notify();
  }

  // --- Supply Donations ---
  public getSupplyDonations(): SupplyDonation[] {
    return this.supplyDonations;
  }

  public addSupplyDonation(donation: Omit<SupplyDonation, 'id' | 'createdAt' | 'isDemoData' | 'status'>): SupplyDonation {
    const newDonation: SupplyDonation = {
      ...donation,
      id: `supply-${Date.now()}`,
      status: 'offered',
      createdAt: new Date().toISOString(),
      isDemoData: true
    };
    this.supplyDonations = [newDonation, ...this.supplyDonations];
    saveStorage('supplies', this.supplyDonations);

    this.addNotification({
      userId: this.currentUser.id,
      title: 'Supply Donation Pledge Created',
      message: `Thank you for pledging essential supplies for "${newDonation.targetOrganizationName}".`,
      type: 'success',
      link: '/user-dashboard'
    });

    this.notify();
    return newDonation;
  }

  public updateSupplyStatus(id: string, status: SupplyDonation['status']): void {
    this.supplyDonations = this.supplyDonations.map((d) => (d.id === id ? { ...d, status } : d));
    saveStorage('supplies', this.supplyDonations);
    this.notify();
  }

  // --- Monetary Donations ---
  public getMonetaryDonations(): MonetaryDonation[] {
    return this.monetaryDonations;
  }

  public addMonetaryDonation(don: Omit<MonetaryDonation, 'id' | 'isDemoData'>): MonetaryDonation {
    const newDonation: MonetaryDonation = {
      ...don,
      id: `don-${Date.now()}`,
      isDemoData: true
    };
    this.monetaryDonations = [newDonation, ...this.monetaryDonations];
    saveStorage('monetary', this.monetaryDonations);
    this.notify();
    return newDonation;
  }

  // --- Audit Logs ---
  public getAuditLogs(): AuditLog[] {
    return this.auditLogs;
  }

  private addAuditLog(entry: Omit<AuditLog, 'id' | 'adminId' | 'adminEmail' | 'timestamp'>): void {
    const newLog: AuditLog = {
      ...entry,
      id: `log-${Date.now()}`,
      adminId: this.currentUser.id,
      adminEmail: this.currentUser.email,
      timestamp: new Date().toISOString()
    };
    this.auditLogs = [newLog, ...this.auditLogs];
    saveStorage('audit_logs', this.auditLogs);
  }

  // --- Notifications ---
  public getNotifications(userId?: string): AppNotification[] {
    if (userId) {
      return this.notifications.filter((n) => n.userId === userId || n.userId === 'all');
    }
    return this.notifications;
  }

  public addNotification(notif: Omit<AppNotification, 'id' | 'read' | 'createdAt'>): void {
    const newNotif: AppNotification = {
      ...notif,
      id: `notif-${Date.now()}`,
      read: false,
      createdAt: new Date().toISOString()
    };
    this.notifications = [newNotif, ...this.notifications];
    saveStorage('notifications', this.notifications);
    this.notify();
  }

  public markNotificationAsRead(id: string): void {
    this.notifications = this.notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    saveStorage('notifications', this.notifications);
    this.notify();
  }

  // Reset to initial demo seeds
  public resetToFactorySeeds(): void {
    localStorage.clear();
    this.users = INITIAL_USERS;
    this.currentUser = INITIAL_USERS[0];
    this.assistancePoints = INITIAL_ASSISTANCE_POINTS;
    this.communityNeeds = INITIAL_COMMUNITY_NEEDS;
    this.volunteerTasks = INITIAL_VOLUNTEER_TASKS;
    this.organizations = INITIAL_ORGANIZATIONS;
    this.supplyDonations = INITIAL_SUPPLY_DONATIONS;
    this.monetaryDonations = INITIAL_MONETARY_DONATIONS;
    this.auditLogs = INITIAL_AUDIT_LOGS;
    this.notifications = INITIAL_NOTIFICATIONS;
    this.notify();
  }
}

export const store = new StoreService();
