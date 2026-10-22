import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import { AppNotification } from '../types';
import {
  Bell,
  CheckCircle2,
  Info,
  AlertTriangle,
  ExternalLink,
  Trash2
} from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const currentUser = store.getCurrentUser();
  const [notifications, setNotifications] = useState<AppNotification[]>(
    store.getNotifications(currentUser.id)
  );

  useEffect(() => {
    return store.subscribe(() => {
      setNotifications(store.getNotifications(currentUser.id));
    });
  }, [currentUser.id]);

  const handleMarkAsRead = (id: string) => {
    store.markNotificationAsRead(id);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold">
            <Bell className="w-3.5 h-3.5 text-brand-coral" />
            <span>Activity Alerts</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Notifications ({notifications.filter((n) => !n.read).length} Unread)
          </h1>
        </div>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
            You have no notifications at this time.
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                notif.read ? 'bg-white border-slate-200' : 'bg-orange-50/40 border-brand-coral/30 shadow-sm'
              }`}
            >
              <div className="mt-0.5">
                {notif.type === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                ) : notif.type === 'success' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Info className="w-5 h-5 text-blue-500" />
                )}
              </div>

              <div className="flex-1 space-y-1 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-slate-900">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400">
                    {new Date(notif.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{notif.message}</p>

                <div className="pt-2 flex items-center justify-between gap-2">
                  {notif.link && (
                    <Link
                      to={notif.link}
                      className="text-xs font-bold text-brand-coral hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Details</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 ml-auto"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
