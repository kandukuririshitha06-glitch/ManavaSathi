import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { store } from '../services/store';
import { VolunteerTask, AssistanceCategory } from '../types';
import { StatusBadge } from '../components/StatusBadge';
import { INDIA_STATES_DATA } from '../utils/indiaGeo';
import {
  Users,
  Calendar,
  MapPin,
  Clock,
  Phone,
  CheckCircle2,
  ShieldCheck,
  Search,
  PlusCircle,
  AlertCircle
} from 'lucide-react';

export const VolunteerOpportunitiesPage: React.FC = () => {
  const currentUser = store.getCurrentUser();
  const [tasks, setTasks] = useState<VolunteerTask[]>(store.getVolunteerTasks());
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<AssistanceCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [joinSuccessId, setJoinSuccessId] = useState<string | null>(null);

  useEffect(() => {
    return store.subscribe(() => {
      setTasks(store.getVolunteerTasks());
    });
  }, []);

  const filtered = tasks.filter((t) => {
    const matchesState = selectedState === 'all' || t.location.state.toLowerCase() === selectedState.toLowerCase();
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === '' ||
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesState && matchesCat && matchesSearch;
  });

  const handleJoinTask = (taskId: string) => {
    const success = store.assignVolunteerToTask(taskId, currentUser.id);
    if (success) {
      setJoinSuccessId(taskId);
      setTimeout(() => setJoinSuccessId(null), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold mb-1">
            <Users className="w-4 h-4 text-teal-600" />
            <span>Nationwide Volunteer Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Volunteer Opportunities
          </h1>
          <p className="text-sm text-slate-600 max-w-2xl mt-0.5">
            Join coordinated meal packing, winter blanket sorting, and dignified distribution tasks organized by verified community coordinators.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/volunteer-dashboard"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors"
          >
            My Volunteer Dashboard
          </Link>
        </div>
      </div>

      {/* Safety & Protocol Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-950 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block mb-0.5 font-bold">Volunteer Dignity Code:</strong>
          <span>
            Every volunteer pledges to serve with deep respect: no taking photos of recipients, no social media filming, and strict adherence to food hygiene standards.
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search task or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as any)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter volunteer tasks by category"
        >
          <option value="all">All Activity Types</option>
          <option value="food">🍲 Meal Packing & Distribution</option>
          <option value="clothing">👕 Winter Blanket & Clothes Sorting</option>
          <option value="hygiene">🧼 Hygiene Kit Assembly</option>
        </select>

        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-brand-coral"
          aria-label="Filter volunteer tasks by state"
        >
          <option value="all">All India States</option>
          {INDIA_STATES_DATA.map((s) => (
            <option key={s.code} value={s.name}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tasks List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((task) => {
          const isJoined = task.volunteersAssigned.includes(currentUser.id);
          const isFull = task.volunteersAssigned.length >= task.volunteersRequired;

          return (
            <div
              key={task.id}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-teal-700 uppercase bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {task.category.replace('_', ' ')}
                  </span>
                  <StatusBadge status={task.status} size="sm" />
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">{task.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{task.description}</p>

                {/* Volunteers required badge */}
                <div className="flex items-center justify-between text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-600 flex items-center gap-1.5 font-medium">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>Volunteers Needed:</span>
                  </span>
                  <span className="font-bold text-slate-900">
                    {task.volunteersAssigned.length} / {task.volunteersRequired} Confirmed
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>When:</strong> {task.dateTime}</span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span><strong>Meet Point:</strong> {task.location.name}, {task.location.city}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span><strong>Lead:</strong> {task.coordinatorName} ({task.coordinatorContact})</span>
                  </p>
                </div>

                {task.safetyInstructions && task.safetyInstructions.length > 0 && (
                  <div className="pt-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Safety Guidelines:</span>
                    <ul className="text-[11px] text-slate-500 space-y-0.5 list-disc pl-4">
                      {task.safetyInstructions.map((inst, idx) => (
                        <li key={idx}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100">
                {joinSuccessId === task.id ? (
                  <div className="py-2 text-center text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>You are confirmed for this activity!</span>
                  </div>
                ) : isJoined ? (
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Enrolled
                    </span>
                    <button
                      onClick={() => store.withdrawVolunteerFromTask(task.id, currentUser.id)}
                      className="text-xs text-slate-500 hover:text-red-600 underline"
                    >
                      Withdraw
                    </button>
                  </div>
                ) : isFull ? (
                  <button
                    disabled
                    className="w-full py-2 bg-slate-100 text-slate-400 rounded-xl text-xs font-semibold cursor-not-allowed"
                  >
                    Task Full
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoinTask(task.id)}
                    className="w-full py-2 bg-brand-coral hover:bg-brand-coralHover text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Join This Activity</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
