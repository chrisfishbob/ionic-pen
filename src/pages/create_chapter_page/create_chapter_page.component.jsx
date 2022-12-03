import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import IonicPenAPI from '../../IonicPenAPI';

function CreateChapterPage() {
    const navigate = useNavigate();
    const { book_id } = useParams();
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
        IonicPenAPI.getBookDetails(book_id).then((res) => {
            setBook(res);
        });
    }, [book_id]);

    function onFormSubmit(event) {
        event.preventDefault();
        IonicPenAPI.createNewBookChapter(book_id, chapterName, chapterText).then((res) => {
            navigate(`/book/${book_id}`);
        });
    }

    return (<div style={{ margin: "2%" }}>
        <h1> { book.book_title } </h1>
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
                Create Chapter
            </Button>
        </Form>
    </div>);
}

export default CreateChapterPage;