import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Book from './Book';
import Song from './Song';
import NavBar from './NavBar';

const ProfileContainer = (props) => {
  const [userProfile, setUserProfile] = useState({
    username: '',
    favoriteBooks: [],
    favoriteSongs: [],
  });
  const [booksList, setBooksList] = useState([]);
  const [songsList, setSongsList] = useState([]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await fetch(`/api/user/profile`);
      const profileData = await response.json();
      console.log(profileData);

      // // FOR TESTING
      // profileData.favoriteSongs.push(
      //   {
      //     songName: 'Song Name 1',
      //     songArtist: 'Song Artist 1',
      //   },
      //   {
      //     songName: 'Song Name 2',
      //     songArtist: 'Song Artist 2',
      //   }
      // );

      // END FOR TESTING

      const { username, favoriteBooks, favoriteSongs } = profileData;
      setUserProfile({ username, favoriteBooks, favoriteSongs });
    };

    try {
      fetchUserProfile();
    } catch (err) {
      console.log('User Profile not found', err);
    }
  }, []);

  useEffect(() => {
    const { favoriteBooks, favoriteSongs } = userProfile;

    // const booksList = [];
    // favoriteBooks.forEach((book, i) => {
    //   booksList.push(
    //     <Book
    //       key={i + book.bookTitle}
    //       bookTitle={book.bookTitle}
    //       bookAuthor={book.bookAuthor}
    //     />
    //   );
    // });
    // setBooksList(booksList);

    const songsList = [];
    favoriteSongs.forEach((song, i) => {
      songsList.push(
        <Song
          key={i + song.songName}
          songName={song.songName}
          songArtist={song.songArtist}
        />
      );
    });
    setSongsList(songsList);
  }, [userProfile]);

  const handleBack = () => {
    navigate('/search');
  };

  useEffect(() => {
    if (!sessionStorage.getItem('loggedIn')) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <NavBar />
      <div className='form'>
        {/* <div className='heading'>Welcome, {userProfile.username}!</div> */}
        <div className='heading'>
          Welcome, {sessionStorage.getItem('username')}!
        </div>
        <div className='favorites-container'>
          {/* <div className='favBooks'>
            <div className='subheading'>Your Favorited Books</div>
            {booksList}
          </div> */}
          <div className='favSongs'>
            <div className='subheading'>Your Favorited Albums</div>
            <div className='album-text'>
              {songsList.length ? songsList : 'You have no favorited albums.'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
