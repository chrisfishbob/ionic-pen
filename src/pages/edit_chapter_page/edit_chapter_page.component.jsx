import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

import IonicPenAPI from '../../IonicPenAPI';

function EditChapterPage() {
    const { book_id } = useParams();
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
            setBook(res.book);
        });
    }, [book_id]);

    return (<div style={{ margin: "2%" }}>
        <h1> Edit chapter for { book.book_title } </h1>
    </div>);
}

export default EditChapterPage;