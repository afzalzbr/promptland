"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    if (params?.id) fetchPrompts();
  }, [params?.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page! Explore ${userName}'s prompts below.`}
      data={posts}
    />
  );
};

export default UserProfile;
