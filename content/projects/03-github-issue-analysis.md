---
title: "Predicting GitHub Issue Resolution Time"
summary: "An in-depth analysis of a machine learning system designed to predict the resolution time of GitHub issues, exploring feature importance, model performance, and architectural challenges."
image: "/images/github-issue-analysis.png"
imageAlt: "Analysis of a system to predict GitHub issue resolution times"
order: 6
projectUrl: "/projects/06-github-issue-analysis"
tags: ["Machine Learning", "Data Science", "Python", "XGBoost", "Data Analysis"]
---

This project presents a comprehensive analysis of a two-layer machine learning system built to forecast the resolution time of GitHub issues. The system was trained on a dataset of nearly 2 million issues from top repositories.

### Key Features of the System

*   **Two-Layer Approach:** A Classification Layer first determines if an issue is "valid" or "won't-fix", and a Regression Layer then predicts resolution time for valid issues.
*   **Advanced Feature Engineering:** The model leverages text embeddings, temporal data, and repository metadata.
*   **Ensemble Modeling:** An ensemble of models (Random Forest, XGBoost) is used to improve predictive accuracy.

The full interactive analysis from the original report, including charts and tables, is rendered live below.