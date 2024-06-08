import React, { useEffect, useRef } from "react";
import {
  Loading,
  DoubleSidedImage,
  SvgIcon,
  ActionLink
} from "components/shared";
import {
  Card,
  Avatar,
  ScrollBar,
  Tag,
  Tooltip,
  Button,
  Timeline
} from "components/ui";
import { useDispatch, useSelector } from "react-redux";
import reducer from "./store";
import { injectReducer } from "store/index";
import { Link, useLocation } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";
import {
  createBookmark,
  createComment,
  createVote,
  deleteBookmark,
  getResource
} from "./store/dataSlice";
import isEmpty from "lodash/isEmpty";
import {
  IoNotificationsOffOutline,
  IoNotificationsOutline
} from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classNames from "classnames";
import { PiBookmarkSimpleFill, PiBookmarkSimpleThin } from "react-icons/pi";
import FileItem from "../ResourceForm/FileItem";
import {
  setSelectedResource,
  toggleDeleteConfirmation
} from "./store/stateSlice";
import { Input } from "components/ui";
import ResourceDeleteConfirmation from "./components/ResourceDeleteConfirmation";
import {
  apiCreateSubscription,
  apiDeleteSubscription
} from "services/NotificationService";
import { toast, Notification } from "components/ui";
import useThemeClass from "utils/hooks/useThemeClass";

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

injectReducer("resourcesDetail", reducer);

const TimelineAvatar = ({ children, ...rest }) => {
  return (
    <Avatar {...rest} size={25} shape="circle" icon={<HiOutlineUser />}>
      {children}
    </Avatar>
  );
};

const ResourceComment = () => {
  const dispatch = useDispatch();

  const resource = useSelector(
    state => state.resourcesDetail.data.resourceData
  );

  const commentInput = useRef();

  const onCommentSubmit = (resourceId, text) => {
    dispatch(createComment({ resourceId, text }));
    commentInput.current.value = "";
  };

  return (
    <div className="mt-6">
      <div className="border-t border-t-gray-200 pt-4 mt-2 mb-6">
        <h3 className="mb-8">Comments</h3>
        {resource?.comments?.length > 0 && (
          <Timeline>
            {resource?.comments?.map(comment => (
              <Timeline.Item
                media={<TimelineAvatar src={comment?.commenter_avatar} />}
              >
                <p className="my-1 flex items-center">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    <ActionLink to={`/users/${comment.commented_by}/answers`}>
                      {comment.commented_by}
                    </ActionLink>
                  </span>
                  <span className="ml-3 rtl:mr-3">
                    {" "}
                    {dayjs(comment.created_at).fromNow()}
                  </span>
                </p>
                <Card className="mt-4">
                  <p>{comment.text}</p>
                </Card>
              </Timeline.Item>
            ))}
          </Timeline>
        )}
        {resource?.comments?.length === 0 && (
          <div className="text-gray-600 text-lg my-4">
            No comments yet. Be the first to leave a comment!{" "}
          </div>
        )}
      </div>
      <h3>Leave a comment</h3>
      <div className="mt-2">
        <Input
          ref={commentInput}
          placeholder="Enter your comment here..."
          textArea
          rows={3}
          className="text-xs"
        />
        <div className="mt-3 flex justify-end gap-2 text-xs">
          <Button onClick={() => (commentInput.current.value = "")} size="xs">
            Reset
          </Button>
          <Button
            onClick={() =>
              onCommentSubmit(resource.id, commentInput.current.value)
            }
            variant="solid"
            size="xs"
          >
            Add comment
          </Button>
        </div>
      </div>
    </div>
  );
};

const ResourceDetail = () => {
  const dispatch = useDispatch();

  const { textTheme } = useThemeClass();

  const location = useLocation();

  const resourceData = useSelector(
    state => state.resourcesDetail.data.resourceData
  );
  const loading = useSelector(state => state.resourcesDetail.data.loading);
  const user = useSelector(state => state.auth.user);

  const fetchData = data => {
    dispatch(getResource(data));
  };

  useEffect(() => {
    const path = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );
    fetchData(path);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const scrollRef = useRef();

  const onCreateVote = (resourceId, vote_type, id) => {
    dispatch(
      createVote({ resourceId, vote_data: { vote_type, object_id: id } })
    );
  };

  const onBookmark = (resourceId, post_id) => {
    dispatch(createBookmark({ resourceId, post_id }));
  };

  const onDeleteBookmark = (resourceId, post_id) => {
    dispatch(deleteBookmark({ resourceId, post_id }));
  };

  const onDelete = () => {
    dispatch(toggleDeleteConfirmation(true));
    dispatch(setSelectedResource(resourceData.id));
  };

  const onUnsubscribe = async () => {
    await apiDeleteSubscription(resourceData.subscription_id);
    dispatch(
      getResource(
        location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
      )
    );
    toast.push(
      <Notification
        title={"Successfully Unsubscribed"}
        type="success"
        duration={2500}
      >
        Successfully Unsubscribed to this resource.
      </Notification>,
      {
        placement: "top-center"
      }
    );
  };

  const onSubscribe = async () => {
    await apiCreateSubscription({
      target_content_type: "resource",
      target_object_id: resourceData.id
    });
    dispatch(
      getResource(
        location.pathname.substring(location.pathname.lastIndexOf("/") + 1)
      )
    );
    toast.push(
      <Notification
        title={"Successfully Subscribed"}
        type="success"
        duration={2500}
      >
        Successfully subscribed to this resource.
      </Notification>,
      {
        placement: "top-center"
      }
    );
  };

  return (
    <>
      <Loading loading={loading}>
        <>
          <div className="bg-white dark:bg-gray-800 px-4 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h1 className="font-normal">{resourceData.title}</h1>
              <div>
                {resourceData.categories?.map((category, index) => (
                  <Tag key={index} prefix>
                    {category}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center mt-4 gap-4">
                <Avatar
                  size={40}
                  shape="circle"
                  icon={<HiOutlineUser />}
                  src=""
                />
                <div className="text-xs">
                  <div className="mb-1">
                    Created by:{" "}
                    <span className="text-xs text-gray-900 dark:text-gray-100">
                      {resourceData.user}
                    </span>
                  </div>
                  <div>
                    <span>
                      Last updated: {dayjs(resourceData.updated_at).fromNow()}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{0} votes</span>
                    <span className="mx-2">•</span>
                    <span>{resourceData.view_count} viewed</span>
                  </div>
                </div>
              </div>
              {user?.username === resourceData.user ? (
                <div className="flex gap-4">
                  <Link to={`/resource-edit/${resourceData.id}`}>
                    <button>Edit</button>
                  </Link>

                  <button className="text-red-700" onClick={onDelete}>
                    Delete
                  </button>
                </div>
              ) : resourceData.subscription_id ? (
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

          <ScrollBar ref={scrollRef} autoHide>
            {/* <div
              className={classNames(
                !isEmpty(resourceData) && !loading
                  ? "block xl:flex"
                  : "hidden xl:flex",
                "flex-col w-full bg-gray-100 dark:bg-gray-900 p-6"
              )}
            > */}
            <div className="m-6 h-full">
              <div className="py-6">
                <div className="flex items-start gap-4 p-4">
                  <div className="flex flex-col items-center">
                    <button
                      className="mb-1"
                      aria-label="Upvote"
                      onClick={() =>
                        onCreateVote(resourceData.id, "upvote", resourceData.id)
                      }
                    >
                      <Tooltip
                        title="This resourceData was helpful"
                        placement="right"
                      >
                        <SvgIcon
                          className={classNames(
                            "border rounded-full p-2",
                            {
                              "fill-indigo-500 border-indigo-500 bg-indigo-50":
                                resourceData.user_vote === "upvote"
                            },
                            {
                              "border-gray-200 fill-gray-500":
                                resourceData.user_vote !== "upvote"
                            }
                          )}
                        >
                          <UpvoteSVG />
                        </SvgIcon>
                      </Tooltip>
                    </button>
                    <span className="text-sm font-semibold">
                      {resourceData.vote_count}
                    </span>
                    <button
                      className="mt-1"
                      aria-label="Downvote"
                      onClick={() =>
                        onCreateVote(
                          resourceData.id,
                          "downvote",
                          resourceData.id
                        )
                      }
                    >
                      <Tooltip
                        title="This resourceData was not helpful"
                        placement="right"
                      >
                        <SvgIcon
                          className={classNames(
                            "border rounded-full p-2",
                            {
                              "fill-indigo-500 border-indigo-500 bg-indigo-50":
                                resourceData.user_vote === "downvote"
                            },
                            {
                              "border-gray-200 fill-gray-500":
                                resourceData.user_vote !== "downvote"
                            }
                          )}
                        >
                          <DownvoteSVG />
                        </SvgIcon>
                      </Tooltip>
                    </button>
                    {resourceData?.is_bookmarked ? (
                      <button
                        className="mt-2"
                        onClick={() =>
                          onDeleteBookmark(resourceData.id, resourceData.id)
                        }
                      >
                        <Tooltip
                          title="You bookmarked this resourceData (select to undo)"
                          placement="right"
                        >
                          <PiBookmarkSimpleFill className="text-3xl fill-indigo-500" />
                        </Tooltip>
                      </button>
                    ) : (
                      <button
                        className="mt-2"
                        onClick={() =>
                          onBookmark(resourceData.id, resourceData.id)
                        }
                      >
                        <Tooltip
                          title="Save this resourceData"
                          placement="right"
                        >
                          <PiBookmarkSimpleThin className="text-3xl" />
                        </Tooltip>
                      </button>
                    )}
                  </div>
                  <div className="flex-grow ">
                    <Card>
                      <div className="text-justify">
                        {ReactHtmlParser(resourceData.description || "")}
                      </div>
                      {resourceData.files && resourceData.files?.length > 0 && (
                        <div className="flex flex-col gap-1">
                          {resourceData.files.map((file, index) => (
                            <FileItem key={index} file={file}></FileItem>
                          ))}
                        </div>
                      )}
                    </Card>
                  </div>
                </div>
                {/* Resource Comment */}
                <ResourceComment />
              </div>
            </div>
            {/* </div> */}
          </ScrollBar>
        </>
      </Loading>
      {!loading && isEmpty(resourceData) && (
        <div className="h-full flex flex-col items-center justify-center">
          <DoubleSidedImage
            src="/img/others/img-2.png"
            darkModeSrc="/img/others/img-2-dark.png"
            alt="No resource found!"
          />
          <h3 className="mt-8">No resource found!</h3>
        </div>
      )}
      <ResourceDeleteConfirmation />
    </>
  );
};

export default ResourceDetail;
