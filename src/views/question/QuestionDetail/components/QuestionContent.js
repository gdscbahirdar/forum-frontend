import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptAnswer,
  createBookmark,
  createComment,
  createVote,
  deleteAnswer,
  deleteBookmark,
  deleteQuestion,
  getAnswers,
  getQuestion
} from "../store/dataSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PiBookmarkSimpleFill,
  PiBookmarkSimpleThin,
  PiCheckFatFill,
  PiCheckFatThin
} from "react-icons/pi";
import {
  ActionLink,
  Loading,
  MediaSkeleton,
  SvgIcon,
  TextBlockSkeleton
} from "components/shared";
import { MdPreview } from "md-editor-rt";
import AnswerCreate from "./AnswerCreate";
import { Button, Dialog, Input, Tooltip } from "components/ui";
import classNames from "classnames";

dayjs.extend(relativeTime);

const UpvoteSVG = () => (
  <svg
    aria-hidden="true"
    className="svg-icon iconArrowUp"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <path d="M1 12h16L9 4l-8 8Z"></path>
  </svg>
);

const DownvoteSVG = () => (
  <svg
    aria-hidden="true"
    className="svg-icon iconArrowDown"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <path d="M1 6h16l-8 8-8-8Z"></path>
  </svg>
);

const FlagSVG = () => (
  <svg
    aria-hidden="true"
    class="svg-icon iconFlag"
    width="18"
    height="18"
    viewBox="0 0 18 18"
  >
    <path d="M3 2v14h2v-6h3.6l.4 1h6V3H9.5L9 2H3Z"></path>
  </svg>
);

const DeleteModal = ({
  dialogIsOpen,
  onDialogClose,
  onDelete,
  toBeDeleted
}) => {
  const { id, type } = toBeDeleted;
  return (
    <Dialog
      isOpen={dialogIsOpen}
      onClose={onDialogClose}
      onRequestClose={onDialogClose}
    >
      <h5 className="mb-4">Delete {type}</h5>
      <p>Are you sure you want to delete this {type}?</p>
      <div className="text-right mt-6">
        <Button
          className="ltr:mr-2 rtl:ml-2"
          variant="plain"
          onClick={onDialogClose}
        >
          Cancel
        </Button>
        <Button variant="solid" color="red" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </div>
    </Dialog>
  );
};

const Answer = ({
  questionId,
  answer,
  onAddCommentClick,
  isActiveComment,
  onBookmark,
  onDeleteBookmark,
  onCreateVote,
  asked_by
}) => {
  const dispatch = useDispatch();
  const commentInput = useRef();

  const onCommentSubmit = (questionId, post_id, text) => {
    dispatch(createComment({ questionId, post_id, text }));
    commentInput.current.value = "";
  };

  const onAcceptAnswer = (questionId, answer_id) => {
    dispatch(acceptAnswer({ questionId, answer_id }));
  };

  const { user } = useSelector(state => state.auth);

  const [dialogIsOpen, setIsOpen] = useState(false);

  const openDialog = id => {
    setIsOpen(true);
  };

  const onDialogClose = e => {
    setIsOpen(false);
  };

  const onDelete = id => {
    dispatch(deleteAnswer({ questionId, answerId: answer.answer_id }));
    setIsOpen(false);
  };

  return (
    <>
      <div className="mt-4 p-4 border border-gray-300 rounded-lg shadow-sm bg-white">
        <div className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <button
              className="mb-1"
              aria-label="Upvote"
              onClick={() => onCreateVote(questionId, "upvote", answer.id)}
            >
              <Tooltip title="This answer was helpful" placement="right">
                <SvgIcon
                  className={classNames(
                    "border rounded-full p-2",
                    {
                      "fill-indigo-500 border-indigo-500 bg-indigo-50":
                        answer.user_vote === "upvote"
                    },
                    {
                      "border-gray-200 fill-gray-500":
                        answer.user_vote !== "upvote"
                    }
                  )}
                >
                  <UpvoteSVG />
                </SvgIcon>
              </Tooltip>
            </button>
            <span className="text-sm font-semibold">{answer.vote_count}</span>
            <button
              className="mt-1"
              aria-label="Downvote"
              onClick={() => onCreateVote(questionId, "downvote", answer.id)}
            >
              <Tooltip title="This answer was not helpful" placement="right">
                <SvgIcon
                  className={classNames(
                    "border rounded-full p-2",
                    {
                      "fill-indigo-500 border-indigo-500 bg-indigo-50":
                        answer.user_vote === "downvote"
                    },
                    {
                      "border-gray-200 fill-gray-500":
                        answer.user_vote !== "downvote"
                    }
                  )}
                >
                  <DownvoteSVG />
                </SvgIcon>
              </Tooltip>
            </button>
            {user?.username === asked_by && (
              <button
                className="mt-2"
                aria-label="Accept-Answer"
                onClick={() => onAcceptAnswer(questionId, answer.answer_id)}
              >
                {answer.is_accepted ? (
                  <Tooltip
                    title="You accepted this answer (select to undo)"
                    placement="right"
                  >
                    <PiCheckFatFill className="text-3xl fill-green-700" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Accept this answer" placement="right">
                    <PiCheckFatThin className="text-3xl" />
                  </Tooltip>
                )}
              </button>
            )}
            {user?.username !== asked_by && answer.is_accepted && (
              <Tooltip title="This answer has been accepted" placement="right">
                <PiCheckFatFill className="text-3xl fill-green-700 my-2" />
              </Tooltip>
            )}
            {answer.is_bookmarked ? (
              <button
                className="mt-2"
                onClick={() => onDeleteBookmark(questionId, answer.id)}
              >
                <Tooltip
                  title="You bookmarked this answer (select to undo)"
                  placement="right"
                >
                  <PiBookmarkSimpleFill className="text-3xl fill-indigo-500" />
                </Tooltip>
              </button>
            ) : (
              <button
                className="mt-2"
                onClick={() => onBookmark(questionId, answer.id)}
              >
                <Tooltip title="Save this answer" placement="right">
                  <PiBookmarkSimpleThin className="text-3xl" />
                </Tooltip>
              </button>
            )}
          </div>
          <div className="flex-grow">
            <MdPreview modelValue={answer.body} />
          </div>
        </div>
        <div className="flex flex-col mt-4 prose max-w-none">
          <div className="flex justify-between">
            {user?.username === answer.answered_by && (
              <div className="flex gap-2 text-xs items-center">
                <ActionLink
                  to={`/questions/answer-edit?id=${questionId}&answer_id=${answer.answer_id}`}
                  themeColor={false}
                  className="no-underline text-gray-500"
                >
                  Edit
                </ActionLink>
                <button onClick={() => openDialog()}>Delete</button>
              </div>
            )}

            <div className="flex flex-col items-end">
              <div className="text-xs text-gray-600">
                Answered{" "}
                {dayjs(answer.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </div>
              <div className="text-xs">{answer.answered_by}</div>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 text-xs border-t border-t-gray-200 pt-2 mt-2">
            {answer?.comments?.map(comment => (
              <div className="flex items-center gap-2">
                <span className="text-sm">{comment.vote_count}</span>
                <div key={comment.id} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <button className="mb-1" aria-label="Upvote">
                      <Tooltip
                        title="This comment was helpful"
                        placement="right"
                      >
                        <SvgIcon className="fill-gray-300">
                          <UpvoteSVG />
                        </SvgIcon>
                      </Tooltip>
                    </button>
                    <button className="mt-1" aria-label="Downvote">
                      <Tooltip
                        title="Flag this comment as inappropriate"
                        placement="right"
                      >
                        <SvgIcon className="fill-gray-300 hover:fill-red-500">
                          <FlagSVG />
                        </SvgIcon>
                      </Tooltip>
                    </button>
                  </div>
                  <div className="flex flex-grow gap-x-1">
                    {comment.text} --{" "}
                    <ActionLink to={`/profile/${comment.commented_by}`}>
                      {comment.commented_by}
                    </ActionLink>
                    <span className="text-xs text-gray-400">
                      {dayjs(comment.created_at).format("YYYY-MM-DD HH:mm")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <button
              onClick={() => onAddCommentClick(answer.id)}
              className="text-xs text-indigo-500"
            >
              <Tooltip
                title="Use comments to ask for more information or suggest improvements. Avoid comments like “+1” or “thanks”."
                placement="right"
              >
                Add a comment
              </Tooltip>
            </button>
          </div>
          {isActiveComment && (
            <div className="mt-2">
              <Input
                ref={commentInput}
                placeholder="Enter your comment here..."
                textArea
                rows={3}
                className="text-xs"
              />
              <div className="mt-3 flex justify-end gap-2 text-xs">
                <Button onClick={onAddCommentClick} size="xs">
                  Cancel
                </Button>
                <Button
                  onClick={() =>
                    onCommentSubmit(
                      questionId,
                      answer.id,
                      commentInput.current.value
                    )
                  }
                  variant="solid"
                  size="xs"
                >
                  Add comment
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {dialogIsOpen && (
        <DeleteModal
          dialogIsOpen={dialogIsOpen}
          onDialogClose={onDialogClose}
          onDelete={onDelete}
          toBeDeleted={{ id: answer.id, type: "answer" }}
        />
      )}
    </>
  );
};

const QuestionContent = ({ questionId }) => {
  const [activeCommentId, setActiveCommentId] = useState(null);

  const handleAddCommentClick = id => {
    setActiveCommentId(activeCommentId === id ? null : id);
  };

  const dispatch = useDispatch();

  const question = useSelector(
    state => state.questionDetails.data.questionData
  );
  const answers = useSelector(state => state.questionDetails.data.answers);
  const loading = useSelector(state => state.questionDetails.data.loading);
  const user = useSelector(state => state.auth.user);

  const commentInput = useRef();

  const onCommentSubmit = (questionId, post_id, text) => {
    dispatch(createComment({ questionId, post_id, text }));
    commentInput.current.value = "";
  };

  const navigate = useNavigate();

  const { search } = useLocation();

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const fetchData = () => {
    if (questionId) {
      dispatch(getQuestion(questionId));
      dispatch(getAnswers(questionId));
    }
  };

  const onCreateVote = (questionId, vote_type, id) => {
    dispatch(
      createVote({ questionId, vote_data: { vote_type, object_id: id } })
    );
  };

  const onBookmark = (questionId, post_id) => {
    dispatch(createBookmark({ questionId, post_id }));
  };

  const onDeleteBookmark = (questionId, post_id) => {
    dispatch(deleteBookmark({ questionId, post_id }));
  };

  const [dialogIsOpen, setIsOpen] = useState(false);
  const [toBeDeleted, setToBeDeleted] = useState(null);

  const openDialog = (id, type) => {
    setToBeDeleted({ id, type });
    setIsOpen(true);
  };

  const onDialogClose = e => {
    setIsOpen(false);
  };

  const onDelete = id => {
    dispatch(deleteQuestion(id));
    setIsOpen(false);
    navigate(`/questions`);
  };

  return (
    <Loading
      loading={loading && question?.length !== 0}
      customLoader={
        <div className="flex flex-col gap-8">
          <MediaSkeleton />
          <TextBlockSkeleton rowCount={6} />
          <TextBlockSkeleton rowCount={4} />
          <TextBlockSkeleton rowCount={8} />
        </div>
      }
    >
      <div className="border-b border-gray-200 mb-4 pb-4">
        <h3>{question.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-4 gap-4">
            {question.asked_by}
            <div className="text-xs">
              <div className="mb-1">
                Created by:
                <span className="text-xs text-gray-900 dark:text-gray-100">
                  {question.asked_by}
                </span>
              </div>
              <div>
                <span>
                  Last updated: {dayjs(question.updated_at).fromNow()}
                </span>
                <span className="mx-2">•</span>
                <span>{question.vote_count} votes</span>
                <span className="mx-2">•</span>
                <span>{question.view_count} viewed</span>
              </div>
            </div>
          </div>
          {user.username === question.asked_by && (
            <div className="flex gap-4">
              <Link to={`/questions/question-edit?id=${question.slug}`}>
                <button>Edit</button>
              </Link>

              <button
                className="text-red-700"
                onClick={() => openDialog(questionId, "Question")}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center mt-4">
          <button
            className="mb-1"
            aria-label="Upvote"
            onClick={() => onCreateVote(questionId, "upvote", question.post_id)}
          >
            <Tooltip title="This question was helpful" placement="right">
              <SvgIcon
                className={classNames(
                  "border rounded-full p-2",
                  {
                    "fill-indigo-500 border-indigo-500 bg-indigo-50":
                      question.user_vote === "upvote"
                  },
                  {
                    "border-gray-200 fill-gray-500":
                      question.user_vote !== "upvote"
                  }
                )}
              >
                <UpvoteSVG />
              </SvgIcon>
            </Tooltip>
          </button>
          <span className="text-sm font-semibold">{question.vote_count}</span>
          <button
            className="mt-1"
            aria-label="Downvote"
            onClick={() =>
              onCreateVote(questionId, "downvote", question.post_id)
            }
          >
            <Tooltip title="This question was not helpful" placement="right">
              <SvgIcon
                className={classNames(
                  "border rounded-full p-2",
                  {
                    "fill-indigo-500 border-indigo-500 bg-indigo-50":
                      question.user_vote === "downvote"
                  },
                  {
                    "border-gray-200 fill-gray-500":
                      question.user_vote !== "downvote"
                  }
                )}
              >
                <DownvoteSVG />
              </SvgIcon>
            </Tooltip>
          </button>
          {question.is_bookmarked ? (
            <button
              className="mt-2"
              onClick={() => onDeleteBookmark(questionId, question.post_id)}
            >
              <Tooltip
                title="You bookmarked this question (select to undo)"
                placement="right"
                on
              >
                <PiBookmarkSimpleFill className="text-3xl fill-indigo-500" />
              </Tooltip>
            </button>
          ) : (
            <button
              className="mt-2"
              onClick={() => onBookmark(questionId, question.post_id)}
            >
              <Tooltip title="Save this question" placement="right">
                <PiBookmarkSimpleThin className="text-3xl" />
              </Tooltip>
            </button>
          )}
        </div>
        <div className="flex-grow">
          <div className="prose dark:prose-invert max-w-prose">
            <MdPreview modelValue={question.body} />

            <div className="flex flex-col items-start gap-2 text-xs border-t border-t-gray-200 pt-2 mt-2">
              {question?.comments?.map(comment => (
                <div className="flex items-center gap-2">
                  <span className="text-sm">{comment.vote_count}</span>
                  <div key={comment.id} className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <button className="mb-1" aria-label="Upvote">
                        <Tooltip
                          title="This comment was helpful"
                          placement="right"
                        >
                          <SvgIcon className="fill-gray-300">
                            <UpvoteSVG />
                          </SvgIcon>
                        </Tooltip>
                      </button>
                      <button className="mt-1" aria-label="Downvote">
                        <Tooltip
                          title="Flag this comment as inappropriate"
                          placement="right"
                        >
                          <SvgIcon className="fill-gray-300 hover:fill-red-500">
                            <FlagSVG />
                          </SvgIcon>
                        </Tooltip>
                      </button>
                    </div>
                    <div className="flex flex-grow gap-x-1">
                      {comment.text} --{" "}
                      <ActionLink to={`/profile/${comment.commented_by}`}>
                        {comment.commented_by}
                      </ActionLink>
                      <span className="text-xs text-gray-400">
                        {dayjs(comment.created_at).format("YYYY-MM-DD HH:mm")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleAddCommentClick(question.id)}
                className="text-xs text-indigo-500"
              >
                <Tooltip
                  title="Use comments to ask for more information or suggest improvements. Avoid comments like “+1” or “thanks”."
                  placement="right"
                >
                  Add a comment
                </Tooltip>
              </button>
            </div>
            {question.id === activeCommentId && (
              <div className="mt-2">
                <Input
                  ref={commentInput}
                  placeholder="Enter your comment here..."
                  textArea
                  rows={3}
                  className="text-xs"
                />
                <div className="mt-3 flex justify-end gap-2 text-xs">
                  <Button onClick={handleAddCommentClick} size="xs">
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      onCommentSubmit(
                        questionId,
                        question.post_id,
                        commentInput.current.value
                      )
                    }
                    variant="solid"
                    size="xs"
                  >
                    Add comment
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h4 className="font-semibold text-lg">
          {question.answer_count} Answer
          {question.answer_count > 1 && "s"}
        </h4>
        {answers &&
          answers.map(answer => (
            <Answer
              key={answer.id}
              questionId={questionId}
              answer={answer}
              onAddCommentClick={handleAddCommentClick}
              isActiveComment={activeCommentId === answer.id}
              onBookmark={onBookmark}
              onDeleteBookmark={onDeleteBookmark}
              onCreateVote={onCreateVote}
              asked_by={question.asked_by}
            />
          ))}
      </div>

      <AnswerCreate questionId={questionId} />
      {toBeDeleted && (
        <DeleteModal
          dialogIsOpen={dialogIsOpen}
          onDialogClose={onDialogClose}
          onDelete={onDelete}
          toBeDeleted={toBeDeleted}
        />
      )}
    </Loading>
  );
};

export default QuestionContent;
