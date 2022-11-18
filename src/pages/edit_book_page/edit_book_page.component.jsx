import ImageUploadField from '../../components/image_upload_field/image_upload_field.component';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import IonicPenAPI from '../../IonicPenAPI';

function EditBookPage() {
    const { book_id } = useParams();
    const [bookTitle, setBookTitle] = useState("");
    const [bookSynopsis, setBookSynopsis] = useState("");
    const [bookCover, setBookCover] = useState(null);

    function onFormSubmit(event) {
        event.preventDefault();
        // IonicPenAPI.createNewBook(bookTitle, bookSynopsis, bookCover).then((res) => {
        //     if (res.book_id) {
        //         navigate("/book");
        //     }
        // });
    }

    useEffect(() => {
        IonicPenAPI.getBookDetails(book_id).then((res) => {
            setBookTitle(res.book.book_title);
            setBookSynopsis(res.book.synopsis);
        });
    });

    return (<div style={{ margin: "2%" }}>
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
                    placeholder="Enter your Book Synopsis"
                    onChange={ ({ target: { value }}) => { setBookSynopsis(value) } }
                    value={ bookSynopsis } />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBookCoverImage">
                <Form.Label>Cover Image</Form.Label>
                <ImageUploadField onUpload={ setBookCover }/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Save Changes
            </Button>
        </Form>
    </div>);
}

export default EditBookPage;