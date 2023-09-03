"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (session) fetchPrompts();
  }, []);

  const handleEdit = (post) => {
    router.push("/update-prompt?id=" + post._id);
  };

  const handleDelete = async (post) => {
    console.log("delete");
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page!"
      data={posts}
      handleEdit={(post) => handleEdit(post)}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
