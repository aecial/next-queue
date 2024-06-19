import React from "react";
import WindowTableRow from "./WindowTableRow";

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

interface WindowTableProps {
  windows: Window[];
}

const WindowTable: React.FC<WindowTableProps> = ({ windows }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Window</th>
            <th>Description</th>
            <th>Office</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {windows.map((window) => (
            <WindowTableRow key={window.id} window={window} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WindowTable;
