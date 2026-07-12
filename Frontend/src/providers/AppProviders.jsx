import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { PlayerProvider } from "../context/PlayerContext";
import { SearchProvider } from "../context/SearchContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PlayerProvider>
          <SearchProvider>
            {children}
          </SearchProvider>
        </PlayerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;