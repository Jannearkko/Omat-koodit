# core of game and rules
defmodule BlackjackGame do
  @card_values %{ # card values as atoms
    :ace => 11,
    :king => 10,
    :queen => 10,
    :jack => 10,
    :ten => 10,
    :nine => 9,
    :eight => 8,
    :seven => 7,
    :six => 6,
    :five => 5,
    :four => 4,
    :three => 3,
    :two => 2
  }

  def generate_deck do # generate deck
    suits = [:hearts,:diamons,:clubs,:spades]
    values = Map.keys(@card_values)
    for suit <- suits, value <- values do
      {suit, value}
    end
  end

  defstruct player_hand: [], dealer_hand: [] # define player and dealer hands

  def deal_hands(deck) do
    player_hand = Enum.take(deck, 2) # deal two cards to the player from a full deck
    dealer_hand = Enum.take(Enum.drop(deck,2),2) # deal two cards to the dealer from a deck with player cards removed from the deck
    {player_hand, dealer_hand}
  end

  def calculate_hand_value(hand) do # calculate the hand value from dealed cards
    hand
    |> Enum.map(&Map.get(@card_values, elem(&1,1),10))
    |> Enum.sum()
  end

  def is_blackjack?(hand) do # check if hand is blackjack
    length(hand) == 2 && calculate_hand_value(hand) == 21
  end

  def is_busted?(hand) do # check if it is busted
    calculate_hand_value(hand) > 21
  end

  def who_wins(player_hand, dealer_hand) do # determine the winner
    player_value = calculate_hand_value(player_hand)
    dealer_value = calculate_hand_value(dealer_hand)

    if player_value > 21 or (dealer_value <= 21 and dealer_value >= player_value) do
      :dealer
    else
      :player
    end
  end
end
