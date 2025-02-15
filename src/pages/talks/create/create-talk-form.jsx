import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import { CONFIG } from '../../../constants/config';
import { Store } from '../../../store/store-provider';
import { InputField } from '../../../components/input-field';
import { TextAreaField } from '../../../components/textarea-field';
import { Button } from '../../../components/button';
import IcBtnCancel from '../../../assets/ic-btn-cancel.svg';
import IcBtnAdd from '../../../assets/ic-btn-add.svg';
const {
  CreateTalkSchema
} = require('../../../../server/src/schemas/create-talk-schema');

const FormStyled = styled.form`
  padding: ${props => props.theme.gridSize}px
    ${props => props.theme.gridSize * 2}px;
`;

const ButtonStyled = styled(Button)`
  margin-left: ${props => props.theme.gridSize * 2}px;
  padding: 0 ${props => props.theme.gridSize * 2}px 0
    ${props => props.theme.gridSize}px;
  height: ${props => props.theme.gridSize * 6}px;
  border-radius: 2px;
`;

const ButtonsGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: ${props => props.theme.gridSize * 6}px;
`;

export const CreateTalkForm = () => {
  const history = useHistory();
  const { state, dispatch } = React.useContext(Store);
  const cancel = React.useCallback(() => history.push('/'));

  // Cache create talk
  const createTalk = React.useCallback(
    talk => {
      if (!(state && state.userInfo && state.userInfo.accessToken)) {
        return;
      }

      axios
        .post(`${CONFIG.apiServer}/talks`, talk, {
          headers: { Authorization: `Bearer ${state.userInfo.accessToken}` }
        })
        .then(resp => {
          if (`${resp.status}`.startsWith('2')) {
            dispatch({ type: 'NEW_TALK', payload: resp.data });
            history.push('/');
          }
        })
        .catch(err => {
          dispatch({ type: 'ERROR', payload: err });
        });
    },
    [dispatch]
  );

  // Form validation tool
  const formik = useFormik({
    initialValues: {
      title: '',
      description: ''
    },
    onSubmit: values => {
      console.log('create talk', values);
      createTalk(values);
    },
    validationSchema: CreateTalkSchema
  });

  return (
    <FormStyled onSubmit={formik.handleSubmit}>
      <InputField
        name="title"
        label="Title"
        onChange={formik.handleChange}
        value={formik.values.title}
        error={formik.errors.title}
        touched={formik.touched.title}
      />
      <TextAreaField
        name="description"
        label="Description"
        rows={4}
        onChange={formik.handleChange}
        value={formik.values.description}
        error={formik.errors.description}
        touched={formik.touched.description}
      />
      <ButtonsGroup>
        <ButtonStyled
          type="button"
          inverted
          icon={<IcBtnCancel />}
          onClick={cancel}
        >
          Cancel
        </ButtonStyled>
        <ButtonStyled type="submit" primary icon={<IcBtnAdd />}>
          Create
        </ButtonStyled>
      </ButtonsGroup>
    </FormStyled>
  );
};
