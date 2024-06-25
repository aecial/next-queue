import UsersTableRow from "./UsersTableRow";

interface Office {
  id: number;
  name: string;
}
type user = {
  id: number;
  username: string;
  officeId: number | null;
  office: Office | null;
};
interface UserTableProps {
  users: user[];
}
const UsersTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Office</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UsersTableRow key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
