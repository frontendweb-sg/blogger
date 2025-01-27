import { BadRequestError, CustomError } from "@/lib/errors";
import { errorHandler } from "@/lib/middleware/error-handler";
import { Post } from "@/lib/model";
import { DEFAULT_LIMIT, DEFAULT_PAGE, MAX_LIMIT } from "@/utils/constants";
import next from "next";
import { NextRequest, NextResponse } from "next/server";
import { Op } from "sequelize";

const ALLOWED_SORT_COLUMNS = [
  "title",
  "status",
  "user_id",
  "createdAt",
  "updatedAt",
];

const POST_ATTRIBUTES = [
  "title",
  "description",
  "media",
  "tags",
  "status",
  "slug",
  "user_id",
  "createdAt",
  "updatedAt",
];
export async function GET(req: NextRequest) {
  try {
    // get query params
    const query = req.nextUrl.searchParams;

    // check if page and limit are numbers
    const page = isNaN(Number(query.get("page")))
      ? DEFAULT_PAGE
      : Math.max(DEFAULT_PAGE, Number(query.get("page")));

    const limit = isNaN(Number(query.get("limit")))
      ? DEFAULT_LIMIT
      : Math.min(MAX_LIMIT, Number(query.get("limit")));

    // check if sort is allowed
    const sort = (
      ALLOWED_SORT_COLUMNS.includes(query.get("sort") || "")
        ? query.sort
        : "createdAt"
    ) as string;
    const order = query.get("order") === "DESC" ? "DESC" : "ASC";

    const search = query.get("search") || "";

    const where = {
      title: search ? { [Op.iLike]: `%${search}%` } : { [Op.ne]: null },
    };

    const posts = await Post.findAll({
      where,
      limit: limit,
      offset: (page - 1) * limit,
      order: [[sort, order]],
      attributes: POST_ATTRIBUTES,
    });

    const total = await Post.count({ where });
    const totalPages = Math.ceil(total / limit);
    return NextResponse.json(
      {
        posts,
        pagination: {
          total,
          page,
          limit,
          totalPages,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 *
 * @param {NextRequest} req
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const slug = body.title.toLowerCase().replace(/s+/g, "-");
    const post = await Post.findOne({ where: { slug } });
    if (post) {
      throw new BadRequestError("Post already exists");
    }
    const result = await Post.create(body);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
