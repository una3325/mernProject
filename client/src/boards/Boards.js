import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../css/Boards.css'

const Boards = () => {
  const navigate = useNavigate()
  const [boards, setBoards] = useState([])

  const getBoardList = async () => {
    try {
      // 게시글 목록 데이터 불러오기
      const boardResp = await axios.get('http://localhost:5000/api/boards')
      const boardData = boardResp.data.reverse()
      setBoards(boardData)
    } catch (error) {
      console.error('데이터를 불러오는데 실패했습니다:', error)
    }
  }

  const moveToWrite = () => {
    navigate('/write')
  }

  useEffect(() => {
    getBoardList()
  }, [])

  return (
    <>
      <h1 className="board-title">게시글 목록</h1>
      <div className="board-container">
        <table className="board-table">
          <thead>
            <tr>
              <th className="column-width">번호</th>
              <th className="column-width">제목</th>
              <th className="column-width">조회수</th>
              {/* <th className="column-width">작성자</th> */}
              <th className="column-width">등록일</th>
            </tr>
          </thead>
          <tbody>
            {boards.map((board, index) => (
              <tr key={board.idx}>
                <td>{boards.length - index}</td>

                <td>
                  <Link to={`/board/${board.idx}`} className="board-link">
                    {board.title}
                  </Link>
                </td>
                {/*내용 <td>
                <Link to={`/board/${board.idx}`} className="board-link">
                  {board.contents.length > 20
                    ? `${board.contents.slice(0, 8)}...`
                    : board.contents}
                </Link>
              </td> */}
                <td>{board.views}</td>
                {/* <td>{board.name}</td> */}
                <td>{new Date(board.updatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: 'center' }}>
          <button onClick={moveToWrite} className="write-button">
            글쓰기
          </button>
        </div>
      </div>
    </>
  )
}

export default Boards
