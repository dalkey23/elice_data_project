import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import {
  CommunityDetailWrapper,
  CommunityDetailHeader,
  CommunityDetailTitle,
  CommunityDetailAuthor,
  CommunityDetailImage,
  CommunityDetailContent,
  CommunityDetailCommentTitle,
  CommunityDetailDivider,
  CommunityDetailComments,
} from './styles/CommunityDetailStyle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Header/Header';

function CommunityDetail() {
  // 게시글의 id를 가져옴
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/board/${id}`,
        );
        setCommunity(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
        navigate('/board');
      }
    }
    // fetchData 함수를 호출 및 실행
    fetchData();
  }, [id, navigate]);

  // 수정하기 버튼을 눌렀을 때 실행되는 함수
  const handleEditClick = () => {
    navigate(`/board/edit/${community._id}`);
  };

  // 삭제하기 버튼을 눌렀을 때 실행되는 함수
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/board/${id}`);
      navigate('/board/all');
    } catch (error) {
      console.error('게시글 삭제에 실패했습니다:', error);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  // 게시글이 로딩되지 않았을 때
  if (!community) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <CommunityDetailWrapper>
        <CommunityDetailHeader>
          <CommunityDetailTitle>
            {' '}
            <FontAwesomeIcon icon={faUsers} style={{ color: '#47b781' }} />{' '}
            {community.title}
          </CommunityDetailTitle>
          <CommunityDetailAuthor>
            작성자: {community.author}
          </CommunityDetailAuthor>
        </CommunityDetailHeader>
        {community.image && community.image.length > 0 && (
          <CommunityDetailImage
            src={community.image[0].imageUrl}
            alt="게시글 이미지"
          />
        )}
        {/* 게시글 내용 */}
        <CommunityDetailContent>{community.content}</CommunityDetailContent>
        <div>
          <button onClick={handleEditClick}>수정하기</button>
          <button onClick={handleDeleteClick}>삭제하기</button>
        </div>
        <CommunityDetailDivider />
        <CommunityDetailCommentTitle>댓글</CommunityDetailCommentTitle>
        <CommunityDetailComments>
          {/* 댓글이 존재할 경우 */}
          {community.comments && community.comments.length > 0 ? (
            community.comments.map((comment) => (
              <div key={comment._id}>
                <h4>{comment.writer}</h4>
                <p>{comment.content}</p>
              </div>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
          <CommentForm />
        </CommunityDetailComments>
      </CommunityDetailWrapper>
    </>
  );
}

export default CommunityDetail;
