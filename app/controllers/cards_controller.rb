class CardsController < ApplicationController
  before_action :set_card, only: [:show, :update, :destroy]

  # GET /cards
  def index
    @subject = Subject.find(params[:subject_id])
    @cards = Card.where(subject_id: @subject.id)
    render json: @cards
  end

  # GET /cards/1
  def show
    @subject = Subject.find(params[:subject_id])
    @card = Card.find(params[:id])
    render json: @card
  end

  # POST /cards
  def create
    # @subject = Subject.find(params[:subject_id])
    @card = Card.new(card_params)
    if @card.save
      @subject.cards << @card
      render json: @card, status: :created
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /cards/1
  def update
    if @card.update(card_params)
      render json: @card
    else
      render json: @card.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cards/1
  def destroy
    @card.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_card
      @card = Card.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def card_params
    params.require(:card).permit(:title, :question, :answer, :answer_notes, :learned, :subjects_id)
end
end


