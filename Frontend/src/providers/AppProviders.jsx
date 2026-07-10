import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { PlayerProvider } from "../context/PlayerContext";

const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <PlayerProvider>
          {children}
        </PlayerProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProviders;