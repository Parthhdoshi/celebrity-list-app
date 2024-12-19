"use client";
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { User } from "./Accordion";

interface DeleteDialogProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  user,
  isOpen,
  onClose,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500"
        >
          <FaTimes />
          {""}
        </button>

        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">
            Are you sure you want to delete?
          </h3>
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={onClose}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => onDelete(user.id)}
              className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
