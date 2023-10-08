import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Write.css'

const Write = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const boardData = {
      title: title,
      contents: contents,
    }

    try {
      const response = await fetch('http://localhost:5000/api/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardData),
      })

      if (response.ok) {
        // 성공적으로 저장되었을 때
        console.log('글이 성공적으로 저장되었습니다.')
        alert('글이 성공적으로 저장되었습니다.')
        navigate('/boards') // boards.js 페이지로 이동
      } else {
        console.error('요청 실패:', response.statusText)
        alert('요청에 실패했습니다. 다시 시도해주세요.')
      }
    } catch (error) {
      console.error('요청 실패:', error)
      alert('요청에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <div>
      <h2 className="boardsWrite">게시글 등록</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">제목</label>

        <input
          placeholder="제목"
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="contents">내용</label>

        <textarea
          placeholder="내용"
          id="contents"
          name="contents"
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          required
        ></textarea>
        <button type="submit">저장</button>
      </form>
    </div>
  )
}

export default Write
