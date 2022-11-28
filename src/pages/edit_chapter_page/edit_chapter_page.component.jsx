import ListGroup from "react-bootstrap/listGroup";
import Offcanvas from "react-bootstrap/Offcanvas";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form"

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';

import IonicPenAPI from '../../IonicPenAPI';

function EditChapterPage() {
    const navigate = useNavigate();
    const { book_id } = useParams();
    const [showChapters, setShowChapters] = useState(false);
    const [chapterIndex, setChapterIndex] = useState(-1);
    const [chapterName, setChapterName] = useState("");
    const [chapterText, setChapterText] = useState("");
    const [book, setBook] = useState({
        cover_image:"",
        book_title: "",
        author: "",
        categories: [],
        age: "",
        wordcount: "",
        chapters: [],
        likes: [],
        synopsis: "",
        reviews: [],
    });

    useEffect(() => {
        setShowChapters(false);
        if (chapterIndex >= 0) {
            IonicPenAPI.getBookChapter(book.chapters[chapterIndex].chapter_id).then((res) => {
                setChapterName(res.chapter_name);
                setChapterText(res.chapter_contents);
            });
        } else {
            setChapterName("");
            setChapterText("");
        }
    }, [chapterIndex]);

    useEffect(() => {
        IonicPenAPI.getBookDetails(book_id).then((res) => {
            setBook(res.book);
            if (res.book.chapters.length > 0) {
                setChapterIndex(res.book.chapters.length - 1);
            }
        });
    }, [book_id]);

    function onFormSubmit(event) {
        event.preventDefault();
        // IonicPenAPI.createNewBookChapter(book_id, chapterName, chapterText).then((res) => {
        //     navigate(`/book/${book_id}`);
        // });
    }

    return (<div style={{ margin: "2%" }}>
        <Offcanvas show={showChapters} onHide={() => setShowChapters(false)}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{book.book_title}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {book.chapters.length > 0 &&
                    <ListGroup as="ul">
                        {book.chapters.map((chapter, ind) => {
                            const is_hovering = false;
                        return (ind === chapterIndex)? (
                            <ListGroup.Item as="li" active>
                            {chapter.chapter_name}
                            </ListGroup.Item>
                        ) : (
                            <ListGroup.Item
                            className="list_item"
                            as="li"
                            onClick={() => setChapterIndex(ind)}
                            >
                            {chapter.chapter_name}
                            </ListGroup.Item>
                        );
                        })}
                    </ListGroup>
                }
                <br/>
                <ListGroup>
                    {(chapterIndex == -1)? (
                        <ListGroup.Item active
                            className="list_item"
                            as="li"
                            onClick={() => setChapterIndex(-1)}
                            >
                            Create New Chapter
                        </ListGroup.Item>
                        ): (
                        <ListGroup.Item
                            className="list_item"
                            as="li"
                            onClick={() => setChapterIndex(-1)}
                            >
                            Create New Chapter
                        </ListGroup.Item>)
                    }
                </ListGroup>
            </Offcanvas.Body>
        </Offcanvas>
        <Button
            variant="outline-dark"
            onClick={() => setShowChapters(true)}
            style={{ marginBottom: "1%" }}
        >
            <h1> {book.book_title} </h1>
        </Button>
        <Form onSubmit={ onFormSubmit }>
            <Form.Group className="mb-3" controlId="formChapterName">
                <Form.Label>Chapter Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Chapter Name"
                    onChange={ ({ target: { value }}) => { setChapterName(value) } }
                    value={ chapterName } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBookSynopsis">
                <Form.Label>Chapter Text</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="Enter your Book Synopsis"
                    onChange={ ({ target: { value }}) => { setChapterText(value) } }
                    value={ chapterText } />
            </Form.Group>
            <Button variant="primary" type="submit">
                {(chapterIndex == -1)? "New": "Edit"} Chapter
            </Button>
        </Form>
    </div>);
}

export default EditChapterPage;