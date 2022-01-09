import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Back from 'src/components/Back';
import { toast } from 'react-toastify';
import Toast from 'src/components/Toast/Toast';
import { useForm } from 'react-hook-form';
import useLocalStorage from 'src/hooks/useLocalStorage';
import { BaseTextInput, InputError } from 'src/baseComponent';

export interface IFungibleToken {
  contractAddress: string;
  symbol: string;
}

const ImportTokenWrapper = styled.div`
  padding: 0 20px;
`;
const Title = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  display: flex;
  line-height: 25px;
  text-align: left;
  width: fit-content;
  padding-top: 22px;
`;
const Body = styled.div`
  height: auto;
  width: 100%;
`;
const DivBody = styled.div`
  width: 100%;
  text-align: left;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  flex-wrap: wrap;
`;
const ButtonSubmit = styled.button`
  width: 100%;
  height: 44px;
  background: #461A57;
  border-radius: 10px;
  font-family: 'Play', sans-serif;
  border: none;
  font-weight: 700;
  color: #ffffff;
  font-size: 16px;
  margin: auto;
  cursor: pointer;
`;
const Footer = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 50px;
  @media screen and (max-width: 480px){
    margin-top: 25px;
  }
`;
const ImportToken = () => {
  const history = useHistory();
  const [fungibleTokens, setFungibleTokens] = useLocalStorage<IFungibleToken[]>('fungibleTokens', []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();
  const onImport = async (fT: IFungibleToken) => {
    const alreadyExists = fungibleTokens?.find((fungToken) => fungToken.contractAddress);
    if (alreadyExists) {
      toast.error(<Toast type="error" content="Token already exists" />);
    } else {
      setFungibleTokens([
        ...(fungibleTokens || []),
        {
          ...fT,
          symbol: fT.symbol?.toLowerCase(),
        },
      ]);
      history.push('/');
    }
  };
  return (
    <ImportTokenWrapper>
      <Back title="Back" onBack={() => history.push('/')} />
      <Body>
        <form onSubmit={handleSubmit(onImport)} id="import-token-form">
          <Title>Import Tokens</Title>
          <DivBody>
            <BaseTextInput
              inputProps={{
                placeholder: 'Input Contract Address',
                ...register('contractAddress', {
                  required: {
                    value: true,
                    message: 'This field is required.',
                  },
                  validate: {
                    required: (val) => val.trim().length > 0 || 'Invalid data',
                  },
                }),
              }}
              title="Token Contract Address (runonflux.flux)"
              height="auto"
              onChange={(e) => { clearErrors('contractAddress'); setValue('contractAddress', e.target.value); }}
            />
            {errors.contractAddress && <InputError>{errors.contractAddress.message}</InputError>}
          </DivBody>
          <DivBody>
            <BaseTextInput
              inputProps={{
                placeholder: 'Input Symbol',
                ...register('symbol', {
                  required: {
                    value: true,
                    message: 'This field is required.',
                  },
                  validate: {
                    required: (val) => val.trim().length > 0 || 'Invalid data',
                  },
                }),
              }}
              title="Token Symbol"
              height="auto"
              onChange={(e) => { clearErrors('symbol'); setValue('symbol', e.target.value); }}
            />
            {errors.symbol && <InputError>{errors.symbol.message}</InputError>}
          </DivBody>
        </form>
      </Body>
      <Footer>
        <ButtonSubmit form="import-token-form">Add Custom Token</ButtonSubmit>
      </Footer>
    </ImportTokenWrapper>
  );
};

export default ImportToken;
