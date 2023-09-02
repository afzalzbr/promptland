"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-state gap-5">
        <div>
          <Image
            src={post.creator.image}
            width={40}
            height={40}
            alt="profile picture"
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inner text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={copied ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            width={16}
            height={16}
            alt="copy button"
            // className="rounded-full object-contain"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inner text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick()}
      >
        {post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
