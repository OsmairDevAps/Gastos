import { createContext } from 'react';
import { IFuncionario } from '@/utils/interface';

type AuthContextType = {
  funcionario: IFuncionario | null;
  setFuncionario: (f: IFuncionario) => void;
};

export const AuthContext = createContext<AuthContextType>({
  funcionario: {} as IFuncionario,
  setFuncionario: () => { },
});