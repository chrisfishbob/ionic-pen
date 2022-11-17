import axios from "axios";
import Session from "./Session";
import config from "./config";

const {
  api: { host },
} = config;

const BASE_URL = host;

class IonicPenAPI {
  static async login(username, password) {
    let errorText = null;
    try {
      const response = await axios.post(`${BASE_URL}/api/login/`, {
        username: username,
        password: password,
      });
      let authKey = response.data["auth-key"];
      if (authKey) {
        Session.setCookie("auth-key", authKey, 28);
        return true;
      }
      errorText = response.data.error;
    } catch (err) {
      console.log(err);
    }
    if (errorText) {
      throw new Error(errorText);
    }
    return false;
  }

  static async signup(username, firstName, lastName, emailID, password) {
    let errorText = null;
    try {
      const response = await axios.post(`${BASE_URL}/api/signup/`, {
        username: username,
        first_name: firstName,
        last_name: lastName,
        email_id: emailID,
        password: password,
      });
      let authKey = response.data["auth-key"];
      if (authKey) {
        Session.setCookie("auth-key", authKey, 28);
        return true;
      }
      errorText = response.data.error;
    } catch (err) {
      console.log(err);
    }
    if (errorText) {
      throw new Error(errorText);
    }
    return false;
  }

  static async getHomepage() {
    let authKey = Session.getCookie("auth-key");
    let response = {};
    try {
      response = await axios.get(`${BASE_URL}/api/homepage/`, {
        headers: {
          "auth-key": authKey,
        },
      });
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  static async getProfile(username) {
    let authKey = Session.getCookie("auth-key");
    let response = {};
    try {
      let result = await axios.get(
        `${BASE_URL}/api/profile/${username ? `?username=${username}` : ""}`,
        {
          headers: {
            "auth-key": authKey,
          },
        }
      );
      response = result.data;
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  static async getBookDetails(bookId) {
    let authKey = Session.getCookie("auth-key");
    let response = {};
    try {
      let result = await axios.get(`${BASE_URL}/api/books/${bookId}/`, {
        headers: {
          "auth-key": authKey,
        },
      });
      if (result) {
        response = result.data;
      }
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  static async getBookmark(book_id) {
    let authKey = Session.getCookie("auth-key");
    let response = {};
    try {
      let result = await axios.get(`${BASE_URL}/api/bookmark/get/${book_id}/`, {
        headers: {
          "auth-key": authKey,
        },
      });
      if (result) {
        response = result.data;
      }
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  static async setBookmark(book_id, chapter_ind) {
    let authKey = Session.getCookie("auth-key");
    let response = {};
    try {
      let result = await axios.put(
        `${BASE_URL}/api/bookmark/set/`,
        {
          book_id: book_id,
          chapter_ind: chapter_ind,
        },
        {
          headers: {
            "auth-key": authKey,
          },
        }
      );
      if (result) {
        response = result.data;
      }
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  static async getBookChapter(chapter_id) {
    let response = {};
    try {
      let result = await axios.get(`${BASE_URL}/api/books/read/${chapter_id}/`);
      if (result) {
        response = result.data;
      }
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  static async getAllBooks() {
    let response = {};
    try {
      let result = await axios.get(`${BASE_URL}/api/books/`);
      if (result) {
        response = result.data;
      }
    } catch (err) {
      console.log(err);
    }
    return response;
  }

  static async getRandomBook() {
    let response = {};
    try {
      let result = await axios.get(`${BASE_URL}/api/books/`);
      if (result) {
        response = result.data;
      }
    } catch (err) {
      console.log(err);
    }

    const bookLength = response["books"].length;
    const randomIndex = Math.floor(Math.random() * bookLength);

    return response["books"][randomIndex];
  }

  static async search(query) {
    let authKey = Session.getCookie("auth-key");
    try {
      const response = await axios.get(`${BASE_URL}/api/search/?q=${query}`, {
        headers: {
          "auth-key": authKey,
        },
      });
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return {};
  }

  static async createNewBook(book_title, book_synopsis, book_cover) {
    let authKey = Session.getCookie("auth-key");
    try {
      const response = await axios.post(
        `${BASE_URL}/api/books/new/`,
        {
          book_title: book_title,
          synopsis: book_synopsis,
          cover_image: "",
        },
        {
          headers: {
            "auth-key": authKey,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return {};
  }

    static async setBookmark(book_id, chapter_ind) {
        let authKey = Session.getCookie('auth-key');
        let response = {};
        try {
            let result = await axios.post(`${BASE_URL}/api/bookmark/set/`, {
                book_id: book_id,
                chapter_ind: chapter_ind
            }, {
                headers: {
                    'auth-key': authKey
                }
            });
            if (result) {
                response = result.data;
            }
        } catch (err) {
            console.log(err);
        }
      );
      console.log(response);
      return response.data;
    } catch (err) {
      console.log(err);
    }
    return {};
  }

  static async editBookDetails(book_title, book_synopsis, book_cover) {
    let authKey = Session.getCookie("auth-key");
    try {
      // const response = await axios.post(
      //   `${BASE_URL}/api/books/new/`,
      //   {
      //     book_title: book_title,
      //     synopsis: book_synopsis,
      //     cover_image: "",
      //   },
      //   {
      //     headers: {
      //       "auth-key": authKey,
      //     },
      //   }
      // );
      // return response.data;
    } catch (err) {
      console.log(err);
    }
    return {};
  }

  static async editBookChapterDetails(book_id, chapter_title, chapter_text) {
    let authKey = Session.getCookie("auth-key");
    try {
      // const response = await axios.post(
      //   `${BASE_URL}/api/books/new/chapter/`,
      //   {
      //     book_id: book_id,
      //     chapter_title: chapter_title,
      //     chapter_contents: chapter_text,
      //   },
      //   {
      //     headers: {
      //       "auth-key": authKey,
      //     },
      //   }
      // );
      // return response.data;
    } catch (err) {
      console.log(err);
    }

    static async createNewBook(book_title, book_synopsis, book_cover) {
        let authKey = Session.getCookie('auth-key');
        try {
            const response = await axios.post(`${BASE_URL}/api/books/new/`, {
                book_title: book_title,
                synopsis: book_synopsis,
                cover_image: ""
            }, {
                headers: {
                    'auth-key': authKey
                }
            });
            return response.data;
        } catch (err) {
            console.log(err);
        }
        return {};
    }

    static async createNewBookChapter(book_id, chapter_title, chapter_text) {
        let authKey = Session.getCookie('auth-key');
        try {
            const response = await axios.post(`${BASE_URL}/api/books/new/chapter/`, {
                book_id: book_id,
                chapter_title: chapter_title,
                chapter_contents: chapter_text
            }, {
                headers: {
                    'auth-key': authKey
                }
            });
            console.log(response);
            return response.data;
        } catch (err) {
            console.log(err);
        }
        return {};
    }
}

export default IonicPenAPI;
