import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createBookmark,
  createComment,
  createVote,
  deleteBookmark,
  deleteQuestion,
  getAnswers,
  getQuestion
} from "../store/dataSlice";
import {
  IoNotificationsOffOutline,
  IoNotificationsOutline
} from "react-icons/io5";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PiBookmarkSimpleFill, PiBookmarkSimpleThin } from "react-icons/pi";
import {
  ActionLink,
  Loading,
  MediaSkeleton,
  SvgIcon,
  TextBlockSkeleton
} from "components/shared";
import AnswerCreate from "./AnswerCreate";
import { Avatar, Button, Input, Tooltip } from "components/ui";
import classNames from "classnames";
import { HiOutlineUser } from "react-icons/hi";
import Editor from "views/question/RTE/Editor";
import AnswerContent from "./AnswerContent";
import {
  DeleteModal,
  DownvoteSVG,
  FlagSVG,
  UpvoteSVG
} from "utils/commonModals";
import useThemeClass from "utils/hooks/useThemeClass";
import {
  apiCreateSubscription,
  apiDeleteSubscription
} from "services/NotificationService";
import { toast, Notification } from "components/ui";

dayjs.extend(relativeTime);

const QuestionContent = ({ questionId }) => {
  const [activeCommentId, setActiveCommentId] = useState(null);

  const handleAddCommentClick = id => {
    setActiveCommentId(activeCommentId === id ? null : id);
  };

  const { textTheme } = useThemeClass();

  const dispatch = useDispatch();

  const question = useSelector(
    state => state.questionDetails.data.questionData
  );
  const answers = useSelector(state => state.questionDetails.data.answers);
  const loading = useSelector(state => state.questionDetails.data.loading);
  const user = useSelector(state => state.auth.user);
  const [body, setBody] = useState({});

  const commentInput = useRef();

  const onCommentSubmit = (questionId, post_id, text) => {
    dispatch(createComment({ questionId, post_id, text }));
    commentInput.current.value = "";
  };

  const navigate = useNavigate();

  const { search } = useLocation();

  useEffect(() => {
    if (question && question.body) {
      setBody(JSON.parse(question.body));
    }
  }, [question]);

  useEffect(() => {
    setBody({});
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

  const onUnsubscribe = async () => {
    await apiDeleteSubscription(question.subscription_id);
    dispatch(getQuestion(questionId));
    toast.push(
      <Notification
        title={"Successfully Unsubscribed"}
        type="success"
        duration={2500}
      >
        Successfully Unsubscribed to this question.
      </Notification>,
      {
        placement: "top-center"
      }
    );
  };

  const onSubscribe = async () => {
    await apiCreateSubscription({
      target_content_type: "question",
      target_object_id: question.id
    });
    dispatch(getQuestion(questionId));
    toast.push(
      <Notification
        title={"Successfully Subscribed"}
        type="success"
        duration={2500}
      >
        Successfully subscribed to this question.
      </Notification>,
      {
        placement: "top-center"
      }
    );
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
        <h3 className="break-words w-full">{question.title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center mt-4 gap-4">
            <Avatar
              size={40}
              shape="circle"
              icon={<HiOutlineUser />}
              src={question.asked_by_avatar}
            />
            <div className="text-xs">
              <div className="mb-1">
                Created by:{" "}
                <span className="text-xs text-gray-900 dark:text-gray-100">
                  <Link to={`/users/${question.asked_by}/answers`}>
                    {question.asked_by}
                  </Link>
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
          {user.username === question.asked_by ? (
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
          ) : question.subscription_id ? (
            <Tooltip title="Unsubscribe">
              <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onUnsubscribe}
              >
                <IoNotificationsOffOutline />
              </span>
            </Tooltip>
          ) : (
            <Tooltip title="Subscribe">
              <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onSubscribe}
              >
                <IoNotificationsOutline />
              </span>
            </Tooltip>
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
          <div className="prose dark:prose-invert max-w-none text-justify">
            {body && Object.keys(body).length > 0 && (
              <Editor initialValue={body} isEditable={false} />
            )}
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
                      <ActionLink to={`/users/${comment.commented_by}/answers`}>
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
            <AnswerContent
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
