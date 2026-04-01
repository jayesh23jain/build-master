'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { PortfolioProject } from '@/lib/types';

interface VendorPortfolioProps {
  showToast: (message: string) => void;
  data?: any;
}

export default function VendorPortfolio({ showToast, data }: VendorPortfolioProps) {
  const [projects, setProjects] = useState<PortfolioProject[]>(data?.portfolio || []);
  const [isLoading, setIsLoading] = useState(!data?.portfolio);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<PortfolioProject | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'residential',
    budget: '',
    timeline: '',
    client: '',
    location: '',
    tags: '',
    status: 'completed',
    images: [] as string[],
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/portfolio', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      showToast('Failed to load portfolio');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map((tag) => tag.trim()),
      };

      // Add or update project
      const url = editingProject
        ? `/api/portfolio/${editingProject.id}`
        : '/api/portfolio';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to save project');
      }

      const data = await res.json();

      if (editingProject) {
        setProjects(projects.map((p) => (p.id === data.project.id ? data.project : p)));
        showToast('Project updated successfully');
      } else {
        setProjects([...projects, data.project]);
        showToast('Project added successfully');
      }

      resetForm();
    } catch (error) {
      console.error('Error saving project:', error);
      showToast('Failed to save project');
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/portfolio/${projectId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to delete project');
      }

      setProjects(projects.filter((p) => p.id !== projectId));
      showToast('Project deleted successfully');
    } catch (error) {
      console.error('Error deleting project:', error);
      showToast('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'residential',
      budget: '',
      timeline: '',
      client: '',
      location: '',
      tags: '',
      status: 'completed',
      images: [],
    });
    setEditingProject(null);
    setShowForm(false);
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      budget: project.budget,
      timeline: project.timeline,
      client: project.client || '',
      location: project.location || '',
      tags: project.tags.join(', '),
      status: project.status,
      images: project.images,
    });
    setShowForm(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#a855f7]"></div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 2.5rem' }} className="bg-[#0d0f14] min-h-screen">
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-['Syne'] text-2xl font-bold text-[#e2eef5]">
          My Portfolio
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '.45rem 1rem',
            fontSize: '.55rem',
            boxShadow: '0 0 18px rgba(168,85,247,0.14)',
          }}
          className="font-['JetBrains_Mono'] uppercase tracking-widest bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-none text-white cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111520] border border-[#1e2a3a] p-8 mb-8"
        >
          <h3 className="font-['Syne'] text-lg font-semibold text-[#e2eef5] mb-6">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  style={{ fontSize: '.5rem' }}
                  className="block font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-2"
                >
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  style={{ padding: '.72rem 1rem', fontSize: '.88rem' }}
                  className="w-full bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] outline-none focus:border-[#a855f7]"
                />
              </div>
              <div>
                <label
                  style={{ fontSize: '.5rem' }}
                  className="block font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-2"
                >
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={{ padding: '.72rem 1rem', fontSize: '.88rem' }}
                  className="w-full bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] outline-none focus:border-[#a855f7] cursor-pointer"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="infrastructure">Infrastructure</option>
                  <option value="renovation">Renovation</option>
                </select>
              </div>
            </div>

            <div>
              <label
                style={{ fontSize: '.5rem' }}
                className="block font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-2"
              >
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                style={{
                  padding: '.72rem 1rem',
                  fontSize: '.88rem',
                  minHeight: '100px',
                }}
                className="w-full bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] outline-none focus:border-[#a855f7] resize-vertical"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  style={{ fontSize: '.5rem' }}
                  className="block font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-2"
                >
                  Budget
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="e.g., 50L - 1Cr"
                  style={{ padding: '.72rem 1rem', fontSize: '.88rem' }}
                  className="w-full bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] outline-none focus:border-[#a855f7]"
                />
              </div>
              <div>
                <label
                  style={{ fontSize: '.5rem' }}
                  className="block font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-2"
                >
                  Timeline
                </label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleInputChange}
                  placeholder="e.g., 6 months"
                  style={{ padding: '.72rem 1rem', fontSize: '.88rem' }}
                  className="w-full bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] outline-none focus:border-[#a855f7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  style={{ fontSize: '.5rem' }}
                  className="block font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-2"
                >
                  Client
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  style={{ padding: '.72rem 1rem', fontSize: '.88rem' }}
                  className="w-full bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] outline-none focus:border-[#a855f7]"
                />
              </div>
              <div>
                <label
                  style={{ fontSize: '.5rem' }}
                  className="block font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-2"
                >
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  style={{ padding: '.72rem 1rem', fontSize: '.88rem' }}
                  className="w-full bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] outline-none focus:border-[#a855f7]"
                />
              </div>
            </div>

            <div>
              <label
                style={{ fontSize: '.5rem' }}
                className="block font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-2"
              >
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="e.g., Structural, RCC, Commercial"
                style={{ padding: '.72rem 1rem', fontSize: '.88rem' }}
                className="w-full bg-[#0d0f14] border border-[#1e2a3a] text-[#e2eef5] font-['DM_Sans'] outline-none focus:border-[#a855f7]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                style={{ padding: '.65rem 1.5rem', fontSize: '.58rem' }}
                className="font-['JetBrains_Mono'] uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#7a9aaa] cursor-pointer transition-all hover:border-[#a855f7] hover:text-[#a855f7]"
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '.65rem 1.5rem',
                  fontSize: '.58rem',
                  boxShadow: '0 6px 20px rgba(168,85,247,0.14)',
                }}
                className="font-['JetBrains_Mono'] uppercase tracking-widest bg-gradient-to-br from-[#7c3aed] to-[#a855f7] border-none text-white cursor-pointer transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                {editingProject ? 'Update' : 'Add'} Project
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-[#111520] border border-[#1e2a3a] rounded">
          <p className="text-[#7a9aaa] mb-4">No portfolio projects yet</p>
          <button
            onClick={() => setShowForm(true)}
            className="text-[#a855f7] hover:text-[#00d9e0] transition-colors"
          >
            Create your first project →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111520] border border-[#1e2a3a] overflow-hidden hover:border-[#2a3d52] transition-all"
            >
              <div style={{ padding: '1.5rem' }}>
                <div
                  style={{ fontSize: '.5rem' }}
                  className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#a855f7] mb-2"
                >
                  {project.category}
                </div>
                <h3
                  style={{ fontSize: '.98rem' }}
                  className="font-['Syne'] font-semibold text-[#e2eef5] mb-2"
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: '.8rem',
                    lineHeight: '1.4',
                  }}
                  className="text-[#7a9aaa] mb-4 line-clamp-2"
                >
                  {project.description}
                </p>

                {project.tags.length > 0 && (
                  <div className="flex gap-1.5 mb-4 flex-wrap">
                    {project.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '.46rem',
                          padding: '.18rem .5rem',
                        }}
                        className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#7a9aaa] border border-[#2a3d52]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div
                  style={{ fontSize: '.82rem' }}
                  className="flex justify-between mb-4 pb-4 border-b border-[#1e2a3a]"
                >
                  <div>
                    <div
                      style={{ fontSize: '.5rem' }}
                      className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-1"
                    >
                      Budget
                    </div>
                    <div className="text-[#e2eef5]">{project.budget}</div>
                  </div>
                  <div>
                    <div
                      style={{ fontSize: '.5rem' }}
                      className="font-['JetBrains_Mono'] uppercase tracking-widest text-[#4a6070] mb-1"
                    >
                      Timeline
                    </div>
                    <div className="text-[#e2eef5]">{project.timeline}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    style={{
                      fontSize: '.52rem',
                      padding: '.45rem .8rem',
                    }}
                    className="flex-1 font-['JetBrains_Mono'] uppercase tracking-widest bg-transparent border border-[#2a3d52] text-[#7a9aaa] cursor-pointer transition-all hover:border-[#a855f7] hover:text-[#a855f7]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    style={{
                      fontSize: '.52rem',
                      padding: '.45rem .8rem',
                    }}
                    className="flex-1 font-['JetBrains_Mono'] uppercase tracking-widest bg-transparent border border-[#f871714d] text-[#f87171] cursor-pointer transition-all hover:border-[#f87171]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
