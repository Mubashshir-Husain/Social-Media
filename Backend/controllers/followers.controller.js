import userModel from "../models/userModel.js";

export async function followUser(req, res) {
    try {
        let targetId = req.params.id;
        let userId = req.user._id;

        if (userId === targetId) {
    return res.json({ message: "You can't follow yourself" });
  }

    const user = await userModel.findById(userId);
  const targetUser = await userModel.findById(targetId);

  if (!targetUser.followers.includes(userId)) {
    targetUser.followers.push(userId);
    user.following.push(targetId);

    await targetUser.save();
    await user.save();

    res.json({ message: "Followed" });
  } else {
    // unfollow
    targetUser.followers.pull(userId);
    user.following.pull(targetId);

    await targetUser.save();
    await user.save();

    res.json({ message: "Unfollowed" });
  }
    } catch (error) {
        return res.json({
            message: "can't follow user",
            error,
        });
    }
}

