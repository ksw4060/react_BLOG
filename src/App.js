// 'logo'가 사용되지 않을 경우 아래 줄을 제거하세요.
import logo from "./logo.svg";

import "./App.css";
import { useState } from "react";

const PostCategory = ({
  id,
  title,
  content,
  publishDate,
  likes,
  onLikeClick,
  onToggleModal,
  onDeleteClick,
  onEditClick,
}) => (
  <div className="col p-4 d-flex flex-column position-static list">
    <strong className="d-inline-block mb-2 text-success title">
      게시글 번호 {id}
    </strong>
    <h3 className="mb-0 post-title">{title}</h3>
    <div className="mb-3 text-muted post-date">{publishDate}</div>
    <p className="mb-4 post-content">{content}</p>
    <p className="mb-5">
      <button className="btn btn-primary" onClick={onLikeClick}>
        👍
      </button>
      좋아요 개수: {likes}{" "}
    </p>
    <button
      className="btn btn-secondary mb-2"
      onClick={() => onToggleModal(id)} // 상세보기 버튼 클릭 시 onToggleModal 함수 호출
    >
      게시글 상세보기
    </button>
    <div className="d-flex flex-column">
      <div className="row">
        <button
          className="btn btn-warning col m-2"
          onClick={() => onEditClick(id)}
        >
          수정
        </button>
        <button
          className="btn btn-danger col m-2"
          onClick={() => onDeleteClick(id)}
        >
          삭제
        </button>
      </div>
    </div>
  </div>
);

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "남자 코트 추천 해드립니다!",
      content: "이 코트는 모의 회사에서 개발한 코트입니다.",
      publishDate: "2023-01-01",
      likes: 0,
    },
    {
      id: 2,
      title: "강남 우동 맛집 소개!",
      content: "이 우동집은 모의 회사에서 개발한 우동집입니다.",
      publishDate: "2023-01-02",
      likes: 0,
    },
    {
      id: 3,
      title: "파이썬 독학하는 방법좀 알려주세요",
      content: "파이썬을 독학하려면 어떻게 해야할까요? ",
      publishDate: "2023-01-03",
      likes: 0,
    },
  ]);
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [newPost, setNewPost] = useState({
    id: posts.length + 1, // Generating a new id for the new post
    title: "",
    content: "",
    publishDate: getCurrentDate(), // Assuming you want to set the current date
    likes: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };
  const addNewPost = () => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setNewPost({
      id: posts.length + 2,
      title: "",
      content: "",
      publishDate: getCurrentDate(),
      likes: 0,
    });
  };
  const [isModalVisible, setModalVisibility] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);
  //   let [changeValue, setChangeValue] = useState("");
  const changeTitle = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[modalIndex].title += " 새로운";
    setPosts(updatedPosts);
  };

  const toggleModal = (index) => {
    setModalVisibility(!isModalVisible);
    setModalIndex(index);
  };

  const incrementLikes = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].likes += 1;
    setPosts(updatedPosts);
  };
  const deletePost = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <div className="App d-flex flex-column align-items-center">
      <div className="black-nav main-head-height d-flex align-items-center justify-content-center">
        <img
          src={logo}
          alt="ReactBlog Logo"
          className="logo-img"
          style={{ width: "50px", height: "50px", marginRight: "10px" }}
        />
        <h4>ReactBlog</h4>
      </div>

      {posts.map((post, index) => (
        <div className="list" key={post.id} style={{ width: "65%" }}>
          <PostCategory
            id={post.id}
            title={post.title}
            content={post.content}
            publishDate={post.publishDate}
            likes={post.likes}
            onLikeClick={() => incrementLikes(index)}
            onToggleModal={() => toggleModal(index)}
            onDeleteClick={() => deletePost(post.id)}
          />
        </div>
      ))}
      {isModalVisible === true ? (
        <Modal
          isVisible={isModalVisible}
          title={posts[modalIndex].title}
          postDate={posts[modalIndex].publishDate}
          postContent={posts[modalIndex].content}
          skyblue={"skyblue"}
          changeTitle={() => changeTitle(modalIndex)} // changeTitle 함수를 props로 내려줌
          toggleModal={() => toggleModal(modalIndex)} // toggleModal 함수를 props로 내려줌
          modalIndex={modalIndex}
        ></Modal>
      ) : null}
      <div
        className="list text-center"
        style={{ width: "65%", margin: "0 auto" }}
      >
        {/* ... (이전 코드 유지) */}
        {/* 새로운 게시글 입력 폼 */}
        <div className="mb-3">
          <label htmlFor="postTitle" className="form-label">
            제목
          </label>
          <input
            type="text"
            className="form-control"
            id="postTitle"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postContent" className="form-label">
            내용
          </label>
          <textarea
            className="form-control"
            id="postContent"
            name="content"
            rows="3"
            value={newPost.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button className="btn btn-primary mb-5" onClick={addNewPost}>
          새로운 게시글 추가
        </button>
      </div>
      {/* <input
        className="m-5"
        onChange={(e) => {
          setChangeValue(e.target.value);
          console.log(e.target.value);
        }}
      ></input> */}
      <div className="mt-5 black-nav main-head-height d-flex flex-column align-items-center justify-content-center">
        <h4>ReactBlog</h4>
      </div>
    </div>
  );
}

// modal 컴포넌트 만들기
function Modal(props) {
  if (props.isVisible === true) {
    const modalTitle = props.title || "제목이 없습니다.";
    const postDate = props.postDate || "날짜가 없습니다.";
    const postContent = props.postContent || "상세내용이 없습니다.";

    return (
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex="-1"
        role="dialog"
      >
        <div
          className="modal-dialog text-center modal-dialog-centered"
          role="document"
        >
          <div className="modal-content rounded-5 shadow p-4">
            <div className="mb-3">
              <div className="d-block">
                <h1 className="modal-title fs-5">{modalTitle}</h1>
              </div>
              <div className="d-block">
                <p className="modal-date ml-auto">{postDate}</p>
              </div>
            </div>
            <div className="modal-body py-0 text-center">
              <p>{postContent}</p>
            </div>
            <div className="modal-footer flex-column align-items-stretch w-100 gap-2 pb-3 border-top-0">
              <button
                type="button"
                className="btn btn-lg btn-primary"
                onClick={props.changeTitle}
              >
                제목 변경
              </button>
              <button
                type="button"
                className="btn btn-lg btn-secondary"
                onClick={props.toggleModal}
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default App;
