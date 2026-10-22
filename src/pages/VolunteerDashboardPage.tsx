import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import type { VolunteerTask, VolunteerProfile } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import {
  Users,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Award,
  Truck,
  Heart,
  Settings,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const VolunteerDashboardPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState(store.getCurrentUser());
  const [tasks, setTasks] = useState<VolunteerTask[]>(store.getVolunteerTasks());
  const [completeTaskId, setCompleteTaskId] = useState<string | null>(null);
  const [completionNotes, setCompletionNotes] = useState('');

  // Volunteer settings state
  const [preferredArea, setPreferredArea] = useState('Hyderabad & Secunderabad');
  const [maxDistance, setMaxDistance] = useState(15);
  const [canTransport, setCanTransport] = useState(true);
  const [canDistribute, setCanDistribute] = useState(true);
  const [savedSettings, setSavedSettings] = useState(false);

  useEffect(() => {
    return store.subscribe(() => {
      setCurrentUser(store.getCurrentUser());
      setTasks(store.getVolunteerTasks());
    });
  }, []);

  const myAssignedTasks = tasks.filter((t) => t.volunteersAssigned.includes(currentUser.id));
  const completedTasks = myAssignedTasks.filter((t) => t.status === 'completed');
  const activeTasks = myAssignedTasks.filter((t) => t.status !== 'completed' && t.status !== 'cancelled');

  const handleCompleteTask = (taskId: string) => {
    store.completeVolunteerTask(taskId, completionNotes || 'Distribution successfully concluded with recipient dignity.');
    setCompleteTaskId(null);
    setCompletionNotes('');
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettings(true);
    setTimeout(() => setSavedSettings(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-1">
            <Users className="w-4 h-4 text-teal-600" />
            <span>Volunteer Dashboard</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Welcome, {currentUser.displayName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Track your volunteer service, upcoming schedules, and outreach impact.
          </p>
        </div>

        <Link
          to="/volunteer"
          className="self-start md:self-auto px-5 py-2.5 rounded-xl bg-brand-coral hover:bg-brand-coralHover text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5"
        >
          <span>Browse More Opportunities</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-brand-coral flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{activeTasks.length}</span>
            <p className="text-xs font-semibold text-slate-500">Upcoming Activities</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">{completedTasks.length}</span>
            <p className="text-xs font-semibold text-slate-500">Completed Service Drives</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900">Level 1 Volunteer</span>
            <p className="text-xs font-semibold text-slate-500">Dignity Certified</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Active tasks and Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Schedule */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">My Scheduled Tasks ({activeTasks.length})</h2>

          {activeTasks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
              <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-sm">No Active Tasks Assigned</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                You currently have no pending volunteer tasks. Explore the opportunities board to find community meal packing, clothing sorting, and supply runs.
              </p>
              <Link
                to="/volunteer"
                className="inline-block px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Browse Opportunities
              </Link>
            </div>
          ) : (
            activeTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-teal-700 uppercase bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {task.category.replace('_', ' ')}
                  </span>
                  <StatusBadge status={task.status} size="sm" />
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{task.title}</h3>
                <p className="text-xs text-slate-600">{task.description}</p>

                <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <p className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>When:</strong> {task.dateTime}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span><strong>Location:</strong> {task.location.name}, {task.location.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span><strong>Coordinator:</strong> {task.coordinatorName} ({task.coordinatorContact})</span>
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => setCompleteTaskId(task.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark Activity Completed</span>
                  </button>

                  <button
                    onClick={() => store.withdrawVolunteerFromTask(task.id, currentUser.id)}
                    className="text-slate-500 hover:text-red-600 underline"
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            ))
          )}

          {/* Past completed tasks list */}
          {completedTasks.length > 0 && (
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-800">Completed Service History</h3>
              {completedTasks.map((t) => (
                <div key={t.id} className="p-3 bg-white rounded-xl border border-slate-200 text-xs flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800">{t.title}</h4>
                    <p className="text-[11px] text-slate-500">{t.location.city} • {t.completionNotes || 'Completed with dignity'}</p>
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                    Completed
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Volunteer Profile Preferences */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Volunteer Service Preferences</h2>

          <form onSubmit={handleSavePreferences} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Preferred Operating Districts</label>
              <input
                type="text"
                value={preferredArea}
                onChange={(e) => setPreferredArea(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Maximum Travel Distance ({maxDistance} km)
              </label>
              <input
                type="range"
                min={5}
                max={50}
                value={maxDistance}
                onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                className="w-full accent-brand-coral"
              />
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="font-bold text-slate-700 block">Capabilities:</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={canTransport}
                  onChange={(e) => setCanTransport(e.target.checked)}
                  className="rounded text-brand-coral"
                />
                <span>Have two-wheeler/car to transport rations or blankets</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={canDistribute}
                  onChange={(e) => setCanDistribute(e.target.checked)}
                  className="rounded text-brand-coral"
                />
                <span>Available for on-ground hot meal serving</span>
              </label>
            </div>

            {savedSettings && (
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-[11px] font-semibold text-center">
                Preferences saved successfully.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Update Preferences
            </button>
          </form>
        </div>
      </div>

      {/* Completion Modal */}
      {completeTaskId && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <h3 className="font-bold text-slate-900 text-base">Complete Activity Report</h3>
            <p className="text-xs text-slate-600">
              Per our safeguarding rules, <strong>no photographs of aid recipients</strong> should ever be taken. Briefly summarize how supplies were shared.
            </p>

            <textarea
              rows={3}
              placeholder="e.g. 40 meals shared respectfully with transport workers and elders..."
              value={completionNotes}
              onChange={(e) => setCompletionNotes(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs focus:outline-none"
            />

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setCompleteTaskId(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleCompleteTask(completeTaskId)}
                className="px-4 py-2 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
              >
                Confirm Completion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
