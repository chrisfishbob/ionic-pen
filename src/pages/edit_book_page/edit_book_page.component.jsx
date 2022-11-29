import ImageUploadField from '../../components/image_upload_field/image_upload_field.component';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import IonicPenAPI from '../../IonicPenAPI';

function EditBookPage() {
    const navigate = useNavigate();

    const { book_id } = useParams();
    const [bookTitle, setBookTitle] = useState("");
    const [bookSynopsis, setBookSynopsis] = useState("");
    const [bookCover, setBookCover] = useState(null);
    const [bookGenres, setBookGenres] = useState(null)

    useEffect(() => {
        IonicPenAPI.getBookDetails(book_id).then((res) => {
            setBookTitle(res.book.book_title);
            setBookSynopsis(res.book.synopsis);
        });
    }, [book_id]);

    function onFormSubmit(event) {
        event.preventDefault();
        if (book_id) {
            IonicPenAPI.editBookDetails(bookTitle, bookSynopsis, bookCover).then((res) => {
                navigate(`/books/info/${book_id}`);
            })
        } else {
            IonicPenAPI.createNewBook(bookTitle, bookSynopsis, bookCover).then((res) => {
                if (res.book_id) {
                    navigate(`/books/info/${res.book_id}`);
                }
            });
        }
    }

    return (<div style={{ marginTop: "2%", marginRight: "11%", marginLeft: "11%"}}>
        <h1 style = {{fontFamily: "sans-serif"}}>
            { book_id? "Edit Book Details" : "Publish New Book" }
        </h1>
        <Form onSubmit={ onFormSubmit }>
            <Form.Group className="mb-3" controlId="formBookTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter Book Title"
                    onChange={ ({ target: { value }}) => { setBookTitle(value) } }
                    value={ bookTitle } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBookSynopsis">
                <Form.Label>Synopsis</Form.Label>
                <Form.Control 
                    as="textarea" 
                    placeholder="Give us a few sentences about your book."
                    onChange={ ({ target: { value }}) => { setBookSynopsis(value) } }
                    value={ bookSynopsis } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBookTitle">
                <Form.Label>Genre Tags</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="List your genres, seperated with a comma"
                    value={ bookGenres } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBookCoverImage">
                <Form.Label>Cover Image</Form.Label>
                <ImageUploadField onUpload={ setBookCover }/>
            </Form.Group>
            { book_id &&
                <div>
                    <Button variant="outline-success" onClick={()=>{navigate(`/books/edit/chapter/${book_id}`)}}>Edit Chapters</Button>
                    <br/>
                    <br/>
                </div>
            }
            <Button style={{ backgroundColor: "#A1FDC6", border: "none", color:"black", width:"10em"}} variant="primary" type="submit">
                { book_id? "Save Changes": "Publish" }
            </Button>
        </Form>
    </div>);
}

export default EditBookPage;