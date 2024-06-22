"use client";
import { useState } from "react";
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
                  //   onSubmit={handleSubmit}
                  className="flex flex-col gap-4 w-full"
                >
                  {/* <input type="hidden" name="id" defaultValue={window.id} />
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
                  /> */}
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
                  //   onSubmit={handleSubmitDelete}
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
