"use client";
import React, { useState } from "react";
import { updateWindow } from "@/actions/updateWindow"; // Import the server action

interface Office {
  id: number;
  name: string;
}

interface Window {
  id: number;
  name: string;
  description: string;
  office: Office;
}

interface WindowTableRowProps {
  window: Window;
}

const WindowTableRow: React.FC<WindowTableRowProps> = ({ window }) => {
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = () => {
    setEditOpen(true);
  };

  const handleClose = () => {
    setEditOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await updateWindow(formData); // Call the server action
      handleClose(); // Close the dialog on successful submission
    } catch (error) {
      console.error("Error updating window:", error);
      // Optionally, handle errors (e.g., show a message to the user)
    }
  };

  return (
    <>
      <tr>
        <th>{window.id}</th>
        <td>{window.name}</td>
        <td>{window.description}</td>
        <td>{window.office.name}</td>
        <td>
          <button className="btn btn-secondary" onClick={handleEdit}>
            Edit
          </button>
          {editOpen && (
            <dialog className="modal" open={editOpen}>
              <div className="modal-box">
                <h3 className="font-bold text-lg">Edit Window {window.id}</h3>
                <div className="divider"></div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 w-full"
                >
                  <input type="hidden" name="id" defaultValue={window.id} />
                  <label className="form-control w-full">
                    <span className="label-text">Window Name:</span>
                    <input
                      type="text"
                      name="name"
                      className="input input-bordered w-full"
                      defaultValue={window.name}
                    />
                  </label>
                  <label className="form-control w-full">
                    <span className="label-text">Description:</span>
                    <input
                      type="text"
                      name="description"
                      className="input input-bordered w-full"
                      defaultValue={window.description}
                    />
                  </label>
                  <input
                    type="hidden"
                    name="officeId"
                    defaultValue={window.office.id}
                  />
                  <div className="modal-action">
                    <button className="btn" type="button" onClick={handleClose}>
                      Close
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </dialog>
          )}
        </td>
      </tr>
    </>
  );
};

export default WindowTableRow;
