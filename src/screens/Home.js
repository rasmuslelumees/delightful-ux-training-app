import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  View,
} from 'react-native';

import Login from './Login';
import ScreensToggleIcon from '../components/ScreensToggleIcon';
import SongList from '../components/SongList';
import Player from '../components/Player';
import songs from '../../assets/topTracks.json';
import { withTheme } from '../utils/theming';

class Home extends React.Component {
  state = {
    currentSong: songs.tracks[0],
    currentSongDuration: 10,
    songs: songs.tracks,
    showLoginScreen: true,
  };

  handleSongPress = currentSong => {
    this.setState({ currentSong });
  };

  handleSongRemove = id => {
    this.setState(({ songs }) => ({
      songs: songs.filter(item => item.track.id !== id),
    }));
  };

  handleFavouriteToggle = id => {
    this.setState(({ songs }) => ({
      songs: songs.map(song =>
        song.track.id === id
          ? {
              ...song,
              isFavourite: !song.isFavourite,
            }
          : song
      ),
    }));
  };

  handleLoginScreenToggle = () => {
    this.setState(prevState => ({
      showLoginScreen: !prevState.showLoginScreen,
    }));
  };

  render() {
    const { theme } = this.props;
    const styles = computeStyles(theme);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <ScreensToggleIcon
            style={styles.toggleIcon}
            color={'#131313'}
            onPress={this.handleLoginScreenToggle}
          />
          <StatusBar barStyle={'dark-content'} />
          <Player
            currentSong={this.state.currentSong}
            duration={this.state.currentSongDuration}
          />
          <SongList
            onSongPress={this.handleSongPress}
            onSongRemove={this.handleSongRemove}
            onFavouriteToggle={this.handleFavouriteToggle}
            songs={this.state.songs}
            currentSong={this.state.currentSong}
          />
          {this.state.showLoginScreen && (
            <Login
              onLoginScreenToggle={this.handleLoginScreenToggle}
              onToggleDarkMode={this.props.onDarkThemeToggle}
              isDarkMode={this.props.isDarkMode}
            />
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(Home);

/* eslint-disable react-native/no-unused-styles */
const computeStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
      backgroundColor: theme.backgroundColor,
    },
    content: {
      flex: 1,
    },
    toggleIcon: {
      marginTop: 8,
    },
  });
