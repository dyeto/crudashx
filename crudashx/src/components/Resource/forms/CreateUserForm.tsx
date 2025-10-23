// components/CreateUserForm.tsx
import React, { useState } from "react";
import { useCreate } from "../../../contexts";


export const CreateUserForm = () => {
  const { create, loading, error } = useCreate<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await create({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold mb-2">Create User</h3>
      <input
        className="border p-1 mb-2 block"
        placeholder="Name"
        value={name}
        onChange={(e:any) => setName(e.target.value)}
      />
      <input
        className="border p-1 mb-2 block"
        placeholder="Email"
        value={email}
        onChange={(e:any) => setEmail(e.target.value)}
      />
      <button
        className="bg-green-500 text-white px-3 py-1 rounded"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create"}
      </button>
      {error && <p className="text-red-500 mt-1">Error: {error.message}</p>}
    </form>
  );
};
