import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit3, Trash2, Save, X, FileText } from 'lucide-react';

const PersonalNotesApp = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [newNote, setNewNote] = useState({ title: '', content: '' });

  // Filter notes based on search term
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new note
  const addNote = () => {
    if (newNote.title.trim() && newNote.content.trim()) {
      const note = {
        id: Date.now(),
        title: newNote.title.trim(),
        content: newNote.content.trim(),
        createdAt: new Date().toLocaleDateString()
      };
      setNotes(prev => [note, ...prev]);
      setNewNote({ title: '', content: '' });
      setIsAddingNote(false);
    }
  };

  // Edit note
  const saveEdit = () => {
    if (editingNote.title.trim() && editingNote.content.trim()) {
      setNotes(prev => prev.map(note =>
        note.id === editingNote.id
          ? { ...note, title: editingNote.title.trim(), content: editingNote.content.trim() }
          : note
      ));
      setEditingNote(null);
    }
  };

  // Delete note
  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  // Cancel operations
  const cancelAdd = () => {
    setNewNote({ title: '', content: '' });
    setIsAddingNote(false);
  };

  const cancelEdit = () => {
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Personal Notes</h1>
          <p className="text-gray-600">Organize your thoughts and ideas</p>
        </div>

        {/* Search and Add Button */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search notes by title or content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={() => setIsAddingNote(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Note
          </button>
        </div>

        {/* Add Note Form */}
        {isAddingNote && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200 animate-in slide-in-from-top duration-300">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Note</h3>
            <input
              type="text"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote(prev => ({ ...prev, title: e.target.value }))}
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
            <textarea
              placeholder="Write your note content here..."
              value={newNote.content}
              onChange={(e) => setNewNote(prev => ({ ...prev, content: e.target.value }))}
              rows="4"
              className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-vertical"
            />
            <div className="flex gap-3">
              <button
                onClick={addNote}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Note
              </button>
              <button
                onClick={cancelAdd}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Notes List */}
        <div className="space-y-4">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                {notes.length === 0 ? 'No notes yet. Create your first note!' : 'No notes match your search.'}
              </p>
            </div>
          ) : (
            filteredNotes.map((note, index) => (
              <div
                key={note.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 animate-in slide-in-from-bottom"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {editingNote?.id === note.id ? (
                  // Edit Mode
                  <div className="p-6">
                    <input
                      type="text"
                      value={editingNote.title}
                      onChange={(e) => setEditingNote(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 text-xl font-semibold"
                    />
                    <textarea
                      value={editingNote.content}
                      onChange={(e) => setEditingNote(prev => ({ ...prev, content: e.target.value }))}
                      rows="4"
                      className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-vertical"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={saveEdit}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-semibold text-gray-800 flex-1 pr-4">
                        {note.title}
                      </h3>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => setEditingNote({ ...note })}
                          className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-all duration-200"
                          title="Edit note"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50 transition-all duration-200"
                          title="Delete note"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-3 leading-relaxed whitespace-pre-wrap">
                      {note.content}
                    </p>
                    <div className="text-sm text-gray-400">
                      Created: {note.createdAt}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in-from-top {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-from-bottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .slide-in-from-top {
          animation-name: slide-in-from-top;
        }

        .slide-in-from-bottom {
          animation-name: slide-in-from-bottom;
        }

        .group:hover .group-hover\\:opacity-100 {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default PersonalNotesApp;