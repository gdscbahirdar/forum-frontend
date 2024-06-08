import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  apiGetQuestionDetails,
  apiDeleteQuestion,
  apiPutQuestion,
  apiGetOthersQuestionList,
  apiGetAnswers,
  apiGetComments,
  apiCreateAnswer,
  apiCreateComment,
  apiCreateVote,
  apiAcceptAnswer,
  apiCreateBookmark,
  apiDeleteBookmark,
  apiGetAnswerDetails,
  apiPutAnswer,
  apiDeleteAnswer
} from "services/QuestionService";

export const getQuestion = createAsyncThunk(
  "questionDetails/data/getQuestion",
  async data => {
    const response = await apiGetQuestionDetails(data);
    const question = response.data;
    return {
      id: question.id,
      title: question.title,
      post_id: question.post.id,
      body: question.post.body,
      slug: question.slug,
      asked_by: question.asked_by,
      asked_by_avatar: question.asked_by_avatar,
      view_count: question.view_count,
      answer_count: question.answer_count,
      user_vote: question.post.user_vote,
      comments: question.post.comments,
      vote_count: question.post.vote_count,
      tags: question.tags,
      is_answered: question.is_answered,
      is_closed: question.is_closed,
      is_bookmarked: question.post.is_bookmarked,
      created_at: question.created_at,
      updated_at: question.updated_at,
      subscription_id: question.subscription_id
    };
  }
);

export const getOthersQuestion = createAsyncThunk(
  "questionDetails/data/getOthersQuestion",
  async data => {
    const response = await apiGetOthersQuestionList(data);
    const related_questions = response.data.related_questions.map(question => ({
      id: question.id,
      title: question.title,
      body: question.post.body,
      slug: question.slug,
      asked_by: question.asked_by,
      view_count: question.view_count,
      answer_count: question.answer_count,
      vote_count: question.post.vote_count,
      tags: question.tags,
      is_answered: question.is_answered,
      is_closed: question.is_closed,
      created_at: question.created_at,
      updated_at: question.updated_at
    }));
    const popular_questions = response.data.popular_questions.map(question => ({
      id: question.id,
      title: question.title,
      body: question.post.body,
      slug: question.slug,
      asked_by: question.asked_by,
      view_count: question.view_count,
      answer_count: question.answer_count,
      vote_count: question.post.vote_count,
      tags: question.tags,
      is_answered: question.is_answered,
      is_closed: question.is_closed,
      created_at: question.created_at,
      updated_at: question.updated_at
    }));
    return {
      relatedQuestion: related_questions,
      popularQuestion: popular_questions
    };
  }
);

export const deleteQuestion = createAsyncThunk(
  "questionDetails/data/deleteQuestion",
  async data => {
    const response = await apiDeleteQuestion(data);
    return response.data;
  }
);

export const putQuestion = createAsyncThunk(
  "questionDetails/data/putQuestion",
  async data => {
    const response = await apiPutQuestion(data);
    return response.data;
  }
);

export const createAnswer = createAsyncThunk(
  "questionDetails/data/createAnswer",
  async data => {
    const response = await apiCreateAnswer(data);
    return response.data;
  }
);

export const getAnswers = createAsyncThunk(
  "questionDetails/data/getAnswers",
  async data => {
    const response = await apiGetAnswers(data);
    const results = response.data.results;
    const transformedData = results.map(answer => ({
      id: answer.post.id,
      answer_id: answer.id,
      body: answer.post.body,
      answered_by: answer.answered_by,
      is_accepted: answer.is_accepted,
      is_bookmarked: answer.post.is_bookmarked,
      user_vote: answer.post.user_vote,
      comments: answer.post.comments,
      vote_count: answer.post.vote_count,
      created_at: answer.post.created_at,
      updated_at: answer.post.updated_at
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const getAnswer = createAsyncThunk(
  "questionDetails/data/getAnswer",
  async data => {
    const { questionId, answerId } = data;
    const response = await apiGetAnswerDetails(questionId, answerId);
    const answer = response.data;
    return {
      id: answer.post.id,
      answer_id: answer.id,
      body: answer.post.body
    };
  }
);

export const putAnswer = createAsyncThunk(
  "questionDetails/data/putAnswer",
  async data => {
    const { questionId, answerId, answer_data } = data;

    const response = await apiPutAnswer(questionId, answerId, answer_data);
    return response.data;
  }
);

export const deleteAnswer = createAsyncThunk(
  "questionDetails/data/deleteAnswer",
  async (data, { dispatch }) => {
    const { questionId, answerId } = data;
    const response = await apiDeleteAnswer(questionId, answerId);
    dispatch(getQuestion(questionId));
    dispatch(getAnswers(questionId));
    return response.data;
  }
);

export const createComment = createAsyncThunk(
  "questionDetails/data/createComment",
  async (data, { dispatch }) => {
    const { questionId, post_id, text } = data;
    const response = await apiCreateComment(post_id, { text });
    dispatch(getAnswers(questionId));
    dispatch(getQuestion(questionId));
    return response.data;
  }
);

export const getComments = createAsyncThunk(
  "questionDetails/data/getComments",
  async data => {
    const response = await apiGetComments(data);
    const results = response.data.results;
    const transformedData = results.map(comment => ({
      id: comment.id,
      body: comment.text,
      commented_by: comment.commented_by,
      created_at: comment.created_at,
      updated_at: comment.updated_at
    }));
    return {
      data: transformedData,
      total: response.data.count
    };
  }
);

export const createVote = createAsyncThunk(
  "questionDetails/data/createVote",
  async (data, { dispatch }) => {
    const { questionId, vote_data } = data;

    const response = await apiCreateVote(vote_data);
    dispatch(getAnswers(questionId));
    dispatch(getQuestion(questionId));
    return response.data;
  }
);

export const acceptAnswer = createAsyncThunk(
  "questionDetails/data/acceptAnswer",
  async (data, { dispatch }) => {
    const { questionId, answer_id } = data;

    const response = await apiAcceptAnswer(questionId, { answer_id });
    dispatch(getAnswers(questionId));
    dispatch(getQuestion(questionId));
    return response.data;
  }
);

export const createBookmark = createAsyncThunk(
  "questionDetails/data/createBookmark",
  async (data, { dispatch }) => {
    const { questionId, post_id } = data;

    const response = await apiCreateBookmark(post_id);
    dispatch(getAnswers(questionId));
    dispatch(getQuestion(questionId));
    return response.data;
  }
);

export const deleteBookmark = createAsyncThunk(
  "questionDetails/data/deleteBookmark",
  async (data, { dispatch }) => {
    const { questionId, post_id } = data;

    const response = await apiDeleteBookmark(post_id);
    dispatch(getAnswers(questionId));
    dispatch(getQuestion(questionId));
    return response.data;
  }
);

export const initialAnswerPaginationData = {
  total: 0,
  page: 1,
  limit: 5,
  sort: {
    field: "created_at",
    key: "-created_at"
  }
};

const dataSlice = createSlice({
  name: "questionDetails/data",
  initialState: {
    loading: false,
    questionData: {},
    answers: [],
    answerDetails: {},
    comments: [],
    answerPaginationData: initialAnswerPaginationData,
    otherLoading: false,
    othersQuestion: {
      relatedQuestion: [],
      popularQuestion: []
    }
  },
  reducers: {
    updateQuestionData: (state, action) => {
      state.questionData = action.payload;
    }
  },
  extraReducers: {
    [getQuestion.fulfilled]: (state, action) => {
      state.loading = false;
      state.questionData = action.payload;
    },
    [deleteQuestion.fulfilled]: () => {},
    [putQuestion.fulfilled]: () => {},
    [getQuestion.pending]: state => {
      state.loading = true;
    },
    [getOthersQuestion.fulfilled]: (state, action) => {
      state.otherLoading = false;
      state.othersQuestion = action.payload;
    },
    [getOthersQuestion.pending]: state => {
      state.otherLoading = true;
    },
    [getAnswers.fulfilled]: (state, action) => {
      state.answers = action.payload.data;
      state.answerPaginationData.total = action.payload.total;
      state.loading = false;
    },
    [getComments.fulfilled]: (state, action) => {
      state.comments = action.payload.data;
      state.loading = false;
    },
    [createVote.fulfilled]: () => {},
    [getAnswer.pending]: state => {
      state.loading = true;
    },
    [getAnswer.fulfilled]: (state, action) => {
      state.loading = false;
      state.answerDetails = action.payload;
    }
  }
});

export const { updateQuestionData } = dataSlice.actions;

export default dataSlice.reducer;
