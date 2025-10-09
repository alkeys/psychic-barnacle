
import { createContext, useContext, useState } from "react";


export interface UsuarioLoginContext {
    idUsuario:number;
	nombreUsuario: string;
	rol: string;
    idTecnico?:number;
    idCliente?:number;
    nombre_completo:string;
    correo?:string;
    telefono?:string;
    especialidad?:string;
}

interface AuthContextType {
  currentUser: UsuarioLoginContext | null;
  login: (user: UsuarioLoginContext) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : {children: React.ReactNode}) => {
  const [currentUser, setCurrentUser] = useState<UsuarioLoginContext | null>(null);

  /**
   *    
   * @param user 
   */
  const login = (user: UsuarioLoginContext) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
