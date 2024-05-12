import React, { useEffect } from "react";
import { Card, Button, Tooltip, Avatar } from "components/ui";
import { Loading, TextEllipsis } from "components/shared";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Confirmations from "./Confirmations";
import {
  HiOutlineTrash,
  HiOutlinePencil,
  HiOutlinePlus,
  HiOutlineUser
} from "react-icons/hi";
import { getFeedbackList } from "./store/dataSlice";
import {
  setSelectedFeedback,
  toggleFeedbackDeleteConfirmation
} from "./store/stateSlice";

const FeedbackList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(state => state.feedback.data.loading);
  const data = useSelector(state => state.feedback.data.feedbackList);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = () => {
    dispatch(getFeedbackList());
  };

  const onFeedbackEdit = id => {
    navigate(`/forum/feedback/edit-feedback?id=${id}`);
  };

  const onFeedbackAdd = () => {
    navigate(`/forum/feedback/edit-feedback`);
  };

  const onFeedbackDelete = id => {
    dispatch(setSelectedFeedback(id));
    dispatch(toggleFeedbackDeleteConfirmation(true));
  };

  return (
    <Loading loading={loading}>
      <div className="mb-6">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {data.length === 0 && (
            <Card
              onClick={() => onFeedbackAdd()}
              className="group border-dashed border-2 hover:border-indigo-600"
              clickable
            >
              <div className="flex flex-col justify-center items-center py-5">
                <div className="p-4 border-2 border-dashed rounded-full border-gray-200 dark:border-gray-600 group-hover:border-indigo-600">
                  <HiOutlinePlus className="text-4xl text-gray-200 dark:text-gray-600 group-hover:text-indigo-600" />
                </div>
                <p className="mt-5 font-semibold">Add Feedback</p>
              </div>
            </Card>
          )}
          {data?.map(feedback => (
            <Card bordered key={feedback.id}>
              <Link
                to={`/forum/feedback/edit-feedback?id=${feedback.id}&detail=true`}
              >
                <h6 className="truncate mb-4">{feedback.title}</h6>
              </Link>
              <div className="min-h-[60px]">
                <TextEllipsis
                  text={feedback.message.replace(/<[^>]*>?/gm, "")}
                  maxTextCount={120}
                />
              </div>
              <div className="flex items-center justify-between mt-4">
                <Avatar
                  size={25}
                  shape="circle"
                  icon={<HiOutlineUser />}
                  src={feedback.author_avatar}
                />
                <div className="flex">
                  <Tooltip title="Delete">
                    <Button
                      shape="circle"
                      variant="plain"
                      size="sm"
                      onClick={() => onFeedbackDelete(feedback.id)}
                      icon={<HiOutlineTrash />}
                    />
                  </Tooltip>
                  <Tooltip title="Edit">
                    <Button
                      shape="circle"
                      variant="plain"
                      size="sm"
                      onClick={() => onFeedbackEdit(feedback.id)}
                      icon={<HiOutlinePencil />}
                    />
                  </Tooltip>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <Confirmations />
    </Loading>
  );
};

export default FeedbackList;
