"use client";
import { useState, useEffect } from "react";
import Accordion from "./components/Accordion";
import SearchBar from "./components/SearchBar";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  useEffect(() => {
    fetch("/celebrities.json")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
      });
  }, []);

  const handleDelete = (id: number) => {
    const data = filteredUsers.filter((user: any) => user.id !== id);
    console.log(data);
    setFilteredUsers(data);
    setUsers(data);
  };

  const handleSearch = (query: string) => {
    const filtered = users.filter((user: any) =>
      `${user.first} ${user.last}`.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleSave = (data: any) => {
    setUsers((prevUsers: any) => {
      const updatedData = prevUsers.map((user: any) =>
        user.id === data.id ? { ...user, ...data } : user
      );

      return updatedData;
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Celebrity View</h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        {filteredUsers.map((user: any) => (
          <Accordion
            key={user.id}
            user={user}
            isOpen={openAccordion === user.id}
            onToggle={() =>
              setOpenAccordion(openAccordion === user.id ? null : user.id)
            }
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
