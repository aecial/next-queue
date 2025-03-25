"use client";
import { useEffect, useState } from "react";
import { addWindow } from "@/actions/window/addWindow";
import { useRouter } from "next/navigation";
type Office = {
  id: number;
  name: string;
};
const WindowManagerNavigations = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [offices, setOffices] = useState<Office[]>([]);
  useEffect(() => {
    const getOffices = async () => {
      const officeFetch = await fetch("/api/offices/names");
      const response = await officeFetch.json();
      setOffices(response.offices);
    };
    getOffices();
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      await addWindow(formData); // Call the server action
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating window:", error);
      // Optionally, handle errors (e.g., show a message to the user)
    }
  };
  return (
    <div className="w-full px-2 flex justify-between">
      <button className="btn btn-primary" onClick={() => router.push("/admin")}>
        Back
      </button>
      <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
        Add New Window
      </button>
      {modalOpen && (
        <dialog className="modal" open={modalOpen}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a New Window</h3>
            <div className="divider"></div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <label className="form-control w-full">
                <span className="label-text">Window Name:</span>
                <input
                  type="text"
                  name="name"
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Description:</span>
                <input
                  type="text"
                  name="description"
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Select Office:</span>
                <select name="officeId" className="input input-bordered w-full">
                  {offices.map((office) => (
                    <option key={office.id} value={office.id}>
                      {office.name}
                    </option>
                  ))}
                </select>
              </label>

              <div className="modal-action">
                <button
                  className="btn"
                  type="button"
                  onClick={() => setModalOpen(false)}
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
    </div>
  );
};

export default WindowManagerNavigations;
