class SubjectsController < ApplicationController
  before_action :set_subject, only: [:show, :update, :destroy]

  # GET /users/<user_id>/subjects
  def index
    @user = User.find(params[:user_id])
    @subjects = Subject.where(user_id: @user.id)
    render json: @subjects, include: :user, status: :ok
  end

  # GET /users/<user_id>/subjects/<subject_id>
  def show
    @user = User.find(params[:user_id])
    @subject = Subject.find(params[:id])
    @cards = Card.where(subject_id: @subject.id)
    render json: @subject, include: [:cards, :user], status: :ok
  end

  # POST /subjects
  def create
    @subject = Subject.new(subject_params)

    if @subject.save
      render json: @subject, status: :created, location: @subject
    else
      render json: @subject.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /subjects/1
  def update
    @subject = Subject.find(params[:id])
    if @subject.update(subject_params)
      render json: @subject, status: :ok
    else
      render json: @subject.errors, status: :unprocessable_entity
    end
  end

  # DELETE /subjects/1
  def destroy
    @subject = Subject.find(params[:id])
    @subject.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_subject
      @subject = Subject.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def subject_params
      params.require(:subject).permit(:title, :description, :user_id)
    end
end
