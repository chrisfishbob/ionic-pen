import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from "react-bootstrap/Button";
import Card from 'react-bootstrap/Card';

import IonicPenAPI from "../../IonicPenAPI";

// URL: http://localhost:3000/read/0d44d190-5990-11ed-bb23-01a4b8795f5e

function ReadingPage() {
    const [bookData, setBookData] = useState({
        book_title: "",
        chapters: [],
        author: "",
        synopsis: ""
    });
    const [chapterData, setChapterData] = useState({
        chapter_name: "",
        chapter_contents: "",
        book_id: "",
        chapter_id: ""
    });
    const [chapterIndex, setChapterIndex] = useState(0);
    const [showChapters, setShowChapters] = useState(false);
    const showChaptersList = () => setShowChapters(true);
    const hideChaptersList = () => setShowChapters(false);
    let { book_id } = useParams();
    useEffect(() => {
        IonicPenAPI.getBookDetails(book_id).then((res) => {
            console.log(res)
            setBookData(res);
            console.log(bookData);
            setChapterData(res.chapters[chapterIndex]);
        })
    }, [chapterIndex])
    return <div style={{margin: "2%"}}>
        <Offcanvas show={showChapters} onHide={hideChaptersList}>
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>{ bookData.book_title }</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {bookData.chapters.map((chapter, ind) => {
                    return (
                        <div>
                            <Button onClick={()=>setChapterIndex(ind)}>
                                { chapter.chapter_name }
                            </Button>
                        </div>
                    )
                })}
            </Offcanvas.Body>
        </Offcanvas>
        <Button variant="primary" onClick={showChaptersList}>
            { bookData.book_title }
        </Button>
        <Card>
        <Card.Header>
            <Card.Title> { chapterData.chapter_name } </Card.Title>
        </Card.Header>
        <Card.Body>
            <div style={{maxHeight: '500px', overflowY: 'scroll'}}>
                <div style={{margin: "2%"}}>
                   <p> {chapterData.chapter_contents} </p>
                    <p> {chapterData.chapter_contents} </p>
                </div>
            </div> 
        </Card.Body>
        </Card>
    </div>
}

export default ReadingPage;