import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { acceptAnswer, createComment, deleteAnswer } from "../store/dataSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router-dom";
import {
  PiBookmarkSimpleFill,
  PiBookmarkSimpleThin,
  PiCheckFatFill,
  PiCheckFatThin
} from "react-icons/pi";
import { ActionLink, SvgIcon } from "components/shared";
import { Button, Input, Tooltip } from "components/ui";
import classNames from "classnames";
import Editor from "views/question/RTE/Editor";
import {
  DeleteModal,
  DownvoteSVG,
  FlagSVG,
  UpvoteSVG
} from "utils/commonModals";

dayjs.extend(relativeTime);

const AnswerContent = ({
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
            <Editor
              initialValue={answer.body ? JSON.parse(answer.body) : {}}
              isEditable={false}
            />
          </div>
        </div>
        <div className="flex flex-col mt-4 prose max-w-none">
          <div className="flex justify-between">
            {user?.username === answer.answered_by ? (
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
            ) : (
              <div></div>
            )}

            <div className="flex flex-col items-end">
              <div className="text-xs text-gray-600">
                Answered{" "}
                {dayjs(answer.created_at).format("YYYY-MM-DD HH:mm:ss")}
              </div>
              <div className="text-xs">
                <Link to={`/users/${answer.answered_by}/answers`}>
                  {answer.answered_by}
                </Link>
              </div>
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
                    <ActionLink to={`/profile/${comment.commented_by}/answers`}>
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

export default AnswerContent;
