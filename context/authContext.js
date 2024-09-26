import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut } from 'firebase/auth';
import { auth, db } from "../firebaseConfig"; // Đảm bảo import db
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
     // console.log('got user: ', user);
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        updateUserData(user.uid);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    });

    return () => unsub();
  }, []);

  const updateUserData = async (userId) => {
    const docRef = doc(db,'users',userId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      let data = docSnap.data();
      setUser({...user,usename: data.username,profileUrl:data.profileUrl,userId:data.userId})

    }
  }
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
     // setUser(response.user);
      //setIsAuthenticated(true);
      return { success: true/*, data: response.user*/ };
    } catch (e) {
      /*console.error(e);
      return { success: false, msg: e.message };*/
      let msg = e.message;
      if (msg.includes('(auth/invalid-email')) msg = 'Email không hợp lệ!!';
      if (msg.includes('(auth/invalid-credential')) msg = 'Sai thông tin email hoặc mật khẩu!!';
      return { success: false, msg};
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      //setUser(null);
     //setIsAuthenticated(false);
     return{success:true}
    } catch (e) {
      //console.error(e);
      return{success: false,msg: e.message, error:e};
    }
  };

  const register = async (email, password, username, profileUrl) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", response.user.uid), {
        username,
        profileUrl,
        userId: response.user.uid
      });
      return { success: true, data: response.user };
    } catch (e) {
      let msg = e.message;
      if (msg.includes('(auth/invalid-email')) msg = 'Email không hợp lệ!!';
      if (msg.includes('(auth/email-already-in-use')) msg = 'Email đã tồn tại!!';      
      return { success: false, msg};
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const value = useContext(AuthContext);
  if (!value) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return value;
};
