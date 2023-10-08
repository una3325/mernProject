import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const BoardDetail = () => {
  const { boardId } = useParams()
  const [boardData, setBoardData] = useState({})

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        // 게시물 데이터를 불러오는 API 요청
        const response = await axios.get(
          `http://localhost:5000/api/boards/${boardId}`
        )
        setBoardData(response.data)
      } catch (error) {
        console.error('게시물을 불러오는데 실패했습니다:', error)
      }
    }

    fetchBoardData()
  }, [boardId])

  return (
    <div>
      <h1>게시판 상세 페이지</h1>

      <p>게시판 제목: {boardData.title}</p>
      <p>게시판 내용: {boardData.contents}</p>
      <p>등록일: {new Date(boardData.updatedAt).toLocaleString()}</p>
    </div>
  )
}

export default BoardDetail
