import Submit from "@/components/Submit";
import CommentList from "@/pages/community/CommentList";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

async function fetchPost(_id){
  const url = `https://api.fesp.shop/posts/${_id}`;
  const res = await fetch(url);
  return res.json();
}

export default function Detail(){
  const { type, _id } = useParams();
  const [data, setData] = useState(null);
  const fetchData = async (_id) => {
    const result = await fetchPost(_id);
    setData(result.item);
  }
  useEffect(() => {
    fetchData(_id);
  }, []);

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <form action={`/${type}`} >
          <div className="font-semibold text-xl">제목 : { data?.title }</div>
          <div className="text-right text-gray-400">작성자 : { data?.user.name }</div>
          <div className="mb-4">
            <div>
              <pre className="font-roboto w-full p-2 whitespace-pre-wrap">{ data?.content }</pre>
            </div>
            <hr/>
          </div>
          <div className="flex justify-end my-4">
            <Link to={`/${type}`} className="bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">목록</Link>
            <Link to={`/${type}/${_id}/edit`} className="bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded">수정</Link>
            <Submit bgColor="red">삭제</Submit>
          </div>
        </form>
      </section>

      {/* 부분 화면 로딩중 */}
      {/*
      <div className="flex flex-col items-center">
        <h3 className="mb-4 text-lg font-semibold">잠시만 기다려주세요.</h3>
        <span>로딩중...</span>
      </div>
      */}
      
      <CommentList />

    </main>
  );
}