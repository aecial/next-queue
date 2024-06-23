"use client";
import { useEffect, useState } from "react";
import { addUser } from "@/actions/user/addUser";
import { useRouter } from "next/navigation";
type Office = {
  id: number;
  name: string;
};
const UserManagerNavigations = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectDefaultVal, setSelectDefaultVal] = useState(0);
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
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
    const password = formData.get("password");
    const confirm_password = formData.get("conf_password");

    if (password !== confirm_password) {
      console.log("password do not match");
    } else {
      try {
        await addUser(formData);
        setModalOpen(false);
      } catch (error) {
        console.error("Error adding user:", error);
      }
    }
  };
  return (
    <div className="w-full px-2 flex justify-between">
      <button className="btn btn-primary" onClick={() => router.push("/admin")}>
        Back
      </button>
      <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
        Add New User
      </button>
      {modalOpen && (
        <dialog className="modal" open={modalOpen}>
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add a New User</h3>
            <div className="divider"></div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 w-full"
            >
              <label className="form-control w-full">
                <span className="label-text">Username:</span>
                <input
                  type="text"
                  name="username"
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Password:</span>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Confirm Password:</span>
                <input
                  type="password"
                  name="conf_password"
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text">Select Office:</span>
                <select
                  name="officeId"
                  className="input input-bordered w-full"
                  defaultValue={selectDefaultVal}
                  onChange={(e) => setSelectDefaultVal(Number(e.target.value))}
                  required
                >
                  <option value={0} disabled>
                    SELECT OFFICE
                  </option>
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
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={selectDefaultVal === 0 || password !== confPassword}
                >
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

export default UserManagerNavigations;
