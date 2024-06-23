"use client";
import { useState } from "react";
import { updateUser } from "@/actions/user/updateUser";
import { deleteUser } from "@/actions/user/deleteUser";
type user = {
  id: number;
  username: string;
  officeId: number | null;
  office: Office | null;
};
interface Office {
  id: number;
  name: string;
}
interface RowProps {
  user: user;
}
const UsersTableRow: React.FC<RowProps> = ({ user }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await updateUser(formData);
      setEditOpen(!editOpen);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  const handleSubmitDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await deleteUser(formData);
      setDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  return (
    <>
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.username}</td>
        <td>{user.office?.name}</td>
        <td className="flex gap-4">
          <button
            className="btn btn-secondary"
            onClick={() => setEditOpen(!editOpen)}
          >
            Edit
          </button>
          {editOpen && (
            <dialog className="modal" open={editOpen}>
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Edit User: {user.username}
                </h3>
                <div className="divider"></div>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 w-full"
                >
                  <input type="hidden" name="id" defaultValue={user.id} />
                  <label className="form-control w-full">
                    <span className="label-text">Username:</span>
                    <input
                      type="text"
                      name="username"
                      className="input input-bordered w-full"
                      defaultValue={user.username}
                    />
                  </label>
                  <label className="form-control w-full">
                    <span className="label-text">New Password:</span>
                    <input
                      type="text"
                      name="password"
                      className="input input-bordered w-full"
                    />
                  </label>
                  <input
                    type="hidden"
                    name="officeId"
                    defaultValue={user?.office?.id}
                  />
                  <div className="modal-action">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setEditOpen(!editOpen)}
                    >
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
          <button
            className="btn btn-error"
            onClick={() => setDeleteOpen(!deleteOpen)}
          >
            Delete
          </button>
          {deleteOpen && (
            <dialog className="modal" open={deleteOpen}>
              <div className="modal-box">
                <h3 className="font-bold text-lg">
                  Delete User {user.username}?
                </h3>
                <div className="divider"></div>
                <form
                  onSubmit={handleSubmitDelete}
                  className="flex flex-col gap-4 w-full"
                >
                  <input type="hidden" name="id" defaultValue={user.id} />

                  <div className="modal-action">
                    <button
                      className="btn"
                      type="button"
                      onClick={() => setDeleteOpen(!deleteOpen)}
                    >
                      Close
                    </button>
                    <button className="btn bg-red-600 text-white" type="submit">
                      Confirm Delete
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

export default UsersTableRow;
