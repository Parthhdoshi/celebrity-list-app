"use client";
import React, { useState } from "react";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { FaRegTimesCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import DeleteDialog from "./DeleteDialog";

export interface User {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

interface AccordionProps {
  user: User;
  isOpen: boolean;
  onToggle: () => void;
  onDelete: (id: number) => void;
  onSave: (data: any) => void;
}

const Accordion: React.FC<AccordionProps> = ({
  user,
  isOpen,
  onToggle,
  onDelete,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({ ...user });
  const [backupData, setBackupData] = useState<User>({ ...user });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave({ ...formData });
    setBackupData({ ...formData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({ ...backupData });
    setIsEditing(false);
  };

  return (
    <div className="mb-5 p-4 border rounded-xl ">
      <div
        onClick={onToggle}
        className="cursor-pointer  flex justify-between items-center "
      >
        <div className="flex items-center">
          <img
            src={user.picture}
            alt="profile"
            className="w-16 h-16 rounded-full"
          />
          {isOpen && isEditing ? (
            <div className="p-1 ml-2">
              <p className="text-sm font-semibold mb-1">First Name :</p>
              <input
                title={""}
                name="first"
                value={formData.first}
                onChange={handleChange}
                className="border rounded-xl p-1 w-full"
              />
            </div>
          ) : (
            <p className="ml-4 ">{formData.first}</p>
          )}
          {isOpen && isEditing ? (
            <div className="p-1 ml-2">
              <p className="text-sm font-semibold mb-1">Last Name :</p>

              <input
                title={""}
                name="last"
                value={formData.last}
                onChange={handleChange}
                className="border rounded-xl p-1 w-full"
              />
            </div>
          ) : (
            <p className="ml-2">{formData.last}</p>
          )}
        </div>
        <span>{isOpen ? "-" : "+"}</span>
      </div>

      {isOpen && (
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-4 mb-4 text-gray-600">
            <div>
              <p className="text-sm font-semibold">Age</p>
              {isEditing ? (
                <input
                  title={""}
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="border rounded-xl p-1 w-full"
                />
              ) : (
                <p>{formData.age} Years</p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold">Gender</p>
              {isEditing ? (
                <select
                  title={""}
                  name="gender"
                  value={formData.gender}
                  onChange={(e: any) => handleChange(e)}
                  className="border rounded-xl p-1.5 w-full"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Rather not say</option>
                  <option>Other</option>
                </select>
              ) : (
                <p>{formData.gender}</p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold">Country</p>
              {isEditing ? (
                <input
                  title={""}
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="border rounded-xl p-1 w-full"
                />
              ) : (
                <p>{formData.country}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm font-semibold text-gray-600">Description</p>
            {isEditing ? (
              <textarea
                title={""}
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="border rounded-xl p-1 w-full"
                rows={3}
              ></textarea>
            ) : (
              <p className="text-gray-700">{formData.description}</p>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="text-green-500 hover:text-green-700"
                >
                  <FaRegCheckCircle className="inline-block mr-1" /> {""}
                </button>
                <button
                  onClick={handleCancel}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaRegTimesCircle className="inline-block mr-1" /> {""}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiEdit2 className="inline-block mr-1" /> {""}
                </button>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="inline-block mr-1" /> {""}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <DeleteDialog
        user={user}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onDelete={onDelete}
      />
    </div>
  );
};

export default Accordion;
