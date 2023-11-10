"use client";
import AddPost from "./components/AddPost";
import axios from "axios";
import { useQuery } from "react-query";
import Post from "./components/Post";
import { PostType } from "./types/Posts";
//fetch all posts
const allPosts = async () => {
  const response = await axios.get("/api/posts/getPosts");
  return response.data;
};
export default function Home() {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading...";
  console.log(data);
  return (
    <main>
      <AddPost />
      {/* outputData */}
      {data?.map((post) => (
        <Post
          comments={post.Comment}
          key={post.id}
          name={post.user.name}
          avatar={post.user.image}
          postTitle={post.title}
          id={post.id}
        />
      ))}
    </main>
  );
}
